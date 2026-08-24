import { readdir, readFile } from 'node:fs/promises'
import { relative, resolve, sep } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

import { Window } from 'happy-dom'

const DEFAULT_SITE_ORIGIN = 'https://lavanti.fi'

const decodePathname = (pathname) => {
    try {
        return decodeURIComponent(pathname)
    } catch {
        return pathname
    }
}

const finding = (code, file, message) => ({ code, file, message })

const listFiles = async (directory) => {
    const entries = await readdir(directory, { withFileTypes: true })
    const files = await Promise.all(
        entries.map((entry) => {
            const path = resolve(directory, entry.name)
            return entry.isDirectory() ? listFiles(path) : [path]
        })
    )

    return files.flat()
}

const outputPathFromFile = (distDir, file) => {
    const outputFile = relative(distDir, file).split(sep).join('/')
    if (outputFile === 'index.html') return '/'
    if (outputFile.endsWith('/index.html')) return `/${outputFile.slice(0, -'index.html'.length)}`
    return `/${outputFile}`
}

const localPath = (value, siteOrigin) => {
    try {
        const site = new URL(siteOrigin)
        const url = new URL(value, site)
        if (url.origin !== site.origin) return null
        return decodePathname(url.pathname)
    } catch {
        return null
    }
}

export const parseRedirects = (content) => {
    const findings = []
    const rules = []

    for (const [index, rawLine] of content.split('\n').entries()) {
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue

        const parts = line.split(/\s+/)
        if (parts.length !== 3) {
            findings.push(
                finding(
                    'redirect-syntax',
                    '_redirects',
                    `line ${index + 1} must contain source, destination, and status`
                )
            )
            continue
        }

        const [source, destination, statusText] = parts
        const status = Number(statusText)
        rules.push({ destination, line: index + 1, source, status })
    }

    return { findings, rules }
}

export const loadDistState = async ({ distDir, siteOrigin = DEFAULT_SITE_ORIGIN }) => {
    const absoluteDistDir = resolve(distDir)
    const files = await listFiles(absoluteDistDir)
    const findings = []
    const htmlRoutes = new Map()
    const assetPaths = new Set()

    for (const file of files) {
        const outputPath = outputPathFromFile(absoluteDistDir, file)
        if (file.endsWith('.html')) {
            htmlRoutes.set(outputPath, { file, html: await readFile(file, 'utf8'), pathname: outputPath })
        } else {
            assetPaths.add(outputPath)
        }
    }

    let redirectContent = ''
    try {
        redirectContent = await readFile(resolve(absoluteDistDir, '_redirects'), 'utf8')
    } catch {
        findings.push(finding('redirects-missing', '_redirects', 'built output does not contain _redirects'))
    }

    const parsedRedirects = parseRedirects(redirectContent)
    findings.push(...parsedRedirects.findings)

    const redirectSources = new Set(
        parsedRedirects.rules.map((rule) => localPath(rule.source, siteOrigin)).filter((path) => path !== null)
    )
    const canonicalRoutes = new Set([...htmlRoutes.keys()].filter((pathname) => !redirectSources.has(pathname)))

    return {
        assetPaths,
        canonicalRoutes,
        distDir: absoluteDistDir,
        findings,
        htmlRoutes,
        redirectRules: parsedRedirects.rules,
        redirectSources,
        siteOrigin,
    }
}

export const auditRedirectRules = (state) => {
    const findings = [...state.findings]
    const rulesBySource = new Map()

    for (const rule of state.redirectRules) {
        const source = localPath(rule.source, state.siteOrigin)
        const destination = localPath(rule.destination, state.siteOrigin)

        if (source === null || !rule.source.startsWith('/')) {
            findings.push(
                finding('redirect-source', '_redirects', `line ${rule.line} has a non-local source: ${rule.source}`)
            )
            continue
        }
        if (destination === null) {
            findings.push(
                finding(
                    'redirect-destination',
                    '_redirects',
                    `line ${rule.line} has a non-local destination: ${rule.destination}`
                )
            )
            continue
        }
        if (rule.status !== 301) {
            findings.push(
                finding(
                    'redirect-status',
                    '_redirects',
                    `line ${rule.line} must use status 301, received ${rule.status}`
                )
            )
        }

        const existing = rulesBySource.get(source)
        if (existing) {
            const code =
                existing.destination === destination && existing.status === rule.status
                    ? 'redirect-duplicate'
                    : 'redirect-conflict'
            findings.push(finding(code, '_redirects', `source ${source} is declared more than once`))
        } else {
            rulesBySource.set(source, { destination, status: rule.status })
        }
    }

    const sources = new Set(rulesBySource.keys())
    for (const [source, rule] of rulesBySource) {
        if (sources.has(rule.destination)) {
            findings.push(
                finding('redirect-chain', '_redirects', `${source} targets redirect source ${rule.destination}`)
            )
            continue
        }
        if (!state.canonicalRoutes.has(rule.destination) && !state.assetPaths.has(rule.destination)) {
            findings.push(
                finding('redirect-target-missing', '_redirects', `${source} targets missing output ${rule.destination}`)
            )
        }
    }

    return findings
}

const auditRouteLinks = (state, route) => {
    const findings = []
    const window = new Window()
    window.document.write(route.html)

    for (const anchor of window.document.querySelectorAll('a[href]')) {
        const href = anchor.getAttribute('href')?.trim()
        if (!href || href.startsWith('#')) continue

        let url
        try {
            url = new URL(href, new URL(route.pathname, state.siteOrigin))
        } catch {
            findings.push(finding('link-invalid', route.file, `invalid href ${href}`))
            continue
        }

        if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
            findings.push(finding('link-localhost', route.file, `href must not target localhost: ${href}`))
            continue
        }
        if (!['http:', 'https:'].includes(url.protocol)) continue
        if (url.origin !== new URL(state.siteOrigin).origin) continue

        const pathname = decodePathname(url.pathname)
        if (state.redirectSources.has(pathname)) {
            findings.push(finding('link-redirect', route.file, `href targets redirect source ${pathname}`))
            continue
        }
        if (state.canonicalRoutes.has(pathname) || state.assetPaths.has(pathname)) continue
        if (pathname !== '/' && state.canonicalRoutes.has(`${pathname}/`)) {
            findings.push(finding('link-noncanonical', route.file, `href must use canonical path ${pathname}/`))
            continue
        }

        findings.push(finding('link-target-missing', route.file, `href targets missing output ${pathname}`))
    }

    window.close()
    return findings
}

export const auditInternalLinks = (state) =>
    [...state.canonicalRoutes].map((pathname) => auditRouteLinks(state, state.htmlRoutes.get(pathname))).flat()

export const auditDist = async (options) => {
    const state = await loadDistState(options)
    return [...auditRedirectRules(state), ...auditInternalLinks(state)]
}

const isMain = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url

if (isMain) {
    const distDir = resolve(process.argv[2] ?? 'dist')
    const findings = await auditDist({ distDir })

    for (const item of findings) {
        process.stderr.write(`ERROR [${item.code}] ${item.file}: ${item.message}\n`)
    }
    process.stdout.write(`Dist contract audit — ${findings.length} finding(s).\n`)
    process.exitCode = findings.length === 0 ? 0 : 1
}
