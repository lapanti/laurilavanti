import { readdir, readFile } from 'node:fs/promises'
import { relative, resolve, sep } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

import { Window } from 'happy-dom'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const DEFAULT_SITE_ORIGIN = 'https://lavanti.fi'
const PRIMARY_SCHEMA_FIELDS = {
    BlogPosting: {
        optional: ['image', 'keywords', 'primaryImageOfPage', 'wordCount'],
        required: [
            'author',
            'dateModified',
            'datePublished',
            'description',
            'headline',
            'inLanguage',
            'license',
            'mainEntityOfPage',
            'url',
        ],
    },
    CollectionPage: {
        optional: ['image'],
        required: ['description', 'inLanguage', 'name', 'url'],
    },
    Person: {
        optional: [
            'affiliation',
            'alumniOf',
            'birthDate',
            'birthPlace',
            'email',
            'familyName',
            'givenName',
            'hasOccupation',
            'image',
            'knowsAbout',
            'knowsLanguage',
            'memberOf',
            'nationality',
            'telephone',
            'worksFor',
        ],
        required: ['@id', 'description', 'jobTitle', 'name', 'sameAs', 'url'],
    },
    ProfilePage: {
        optional: ['dateModified', 'image'],
        required: ['description', 'inLanguage', 'mainEntity', 'name', 'url'],
    },
    WebPage: {
        optional: ['dateModified', 'image'],
        required: ['description', 'inLanguage', 'name', 'url'],
    },
    WebSite: {
        optional: ['image'],
        required: ['description', 'inLanguage', 'name', 'sameAs', 'url'],
    },
}
const SUPPLEMENTAL_SCHEMA_TYPES = new Set(['BreadcrumbList', 'FAQPage'])
const URL_FIELDS = new Set(['@id', 'item', 'license', 'url'])

const decodePathname = (pathname) => {
    try {
        return decodeURIComponent(pathname)
    } catch {
        return pathname
    }
}

const finding = (code, file, message) => ({ code, file, message })
const normalizeText = (value) =>
    value
        .normalize('NFKC')
        .replace(/\u00ad/g, '')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201c\u201d]/g, '"')
        .replace(/\s+/g, ' ')
        .trim()

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

const inspectRoute = (state, route) => {
    const cached = state.routeSnapshots.get(route.pathname)
    if (cached) return cached

    const window = new Window()
    window.document.write(route.html)
    const document = window.document
    const snapshot = {
        alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => ({
            href: link.getAttribute('href')?.trim() ?? '',
            hreflang: link.getAttribute('hreflang')?.trim() ?? '',
        })),
        canonicalHrefs: [...document.querySelectorAll('link[rel="canonical"]')].map(
            (link) => link.getAttribute('href')?.trim() ?? ''
        ),
        jsonLdScripts: [...document.querySelectorAll('script[type="application/ld+json"]')].map(
            (script) => script.textContent ?? ''
        ),
        links: [...document.querySelectorAll('a[href]')].map((anchor) => anchor.getAttribute('href')?.trim() ?? ''),
        ogUrls: [...document.querySelectorAll('meta[property="og:url"]')].map(
            (meta) => meta.getAttribute('content')?.trim() ?? ''
        ),
        robots: [...document.querySelectorAll('meta[name="robots"]')].map(
            (meta) => meta.getAttribute('content')?.trim() ?? ''
        ),
        themeColors: [...document.querySelectorAll('meta[name="theme-color"]')].map(
            (meta) => meta.getAttribute('content')?.trim() ?? ''
        ),
        visibleText: normalizeText(document.body?.textContent ?? ''),
    }

    window.close()
    state.routeSnapshots.set(route.pathname, snapshot)
    return snapshot
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
        routeSnapshots: new Map(),
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

export const auditFinnishAliases = (state) => {
    const findings = []
    const rules = new Map()

    for (const rule of state.redirectRules) {
        const source = localPath(rule.source, state.siteOrigin)
        const destination = localPath(rule.destination, state.siteOrigin)
        if (source !== null && destination !== null && !rules.has(source)) {
            rules.set(source, { destination, status: rule.status })
        }
    }

    for (const pathname of state.canonicalRoutes) {
        if (pathname === '/fi/' || !pathname.startsWith('/fi/') || !pathname.endsWith('/')) continue

        const aliasWithSlash = pathname.slice('/fi'.length)
        const expectedAliases = [aliasWithSlash.slice(0, -1), aliasWithSlash]
        for (const source of expectedAliases) {
            const rule = rules.get(source)
            if (!rule) {
                findings.push(finding('finnish-alias-missing', '_redirects', `${source} must redirect to ${pathname}`))
            } else if (rule.destination !== pathname || rule.status !== 301) {
                findings.push(
                    finding(
                        'finnish-alias-target',
                        '_redirects',
                        `${source} must redirect directly to ${pathname} with status 301`
                    )
                )
            }
        }
    }

    return findings
}

const auditRouteLinks = (state, route) => {
    const findings = []
    const snapshot = inspectRoute(state, route)

    for (const href of snapshot.links) {
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

    return findings
}

export const auditInternalLinks = (state) =>
    [...state.canonicalRoutes].map((pathname) => auditRouteLinks(state, state.htmlRoutes.get(pathname))).flat()

const parseJsonLd = (snapshot, route) => {
    const findings = []
    const schemas = []

    for (const [index, script] of snapshot.jsonLdScripts.entries()) {
        try {
            const schema = JSON.parse(script)
            if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
                findings.push(finding('jsonld-shape', route.file, `JSON-LD script ${index + 1} must contain an object`))
            } else {
                schemas.push(schema)
            }
        } catch (error) {
            findings.push(
                finding('jsonld-parse', route.file, `JSON-LD script ${index + 1} is invalid: ${error.message}`)
            )
        }
    }

    return { findings, schemas }
}

const auditJsonLdValues = (route, schema, path = '$', parentKey = '') => {
    const findings = []

    if (schema === null) {
        return [finding('jsonld-null', route.file, `${path} must not be null`)]
    }
    if (typeof schema === 'string') {
        if (!schema.trim()) findings.push(finding('jsonld-empty', route.file, `${path} must not be empty`))
        if (URL_FIELDS.has(parentKey) || ['image', 'sameAs'].includes(parentKey)) {
            try {
                const url = new URL(schema)
                if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported protocol')
            } catch {
                findings.push(finding('jsonld-url', route.file, `${path} must be an absolute HTTP(S) URL`))
            }
        }
        return findings
    }
    if (Array.isArray(schema)) {
        return schema.flatMap((value, index) => auditJsonLdValues(route, value, `${path}[${index}]`, parentKey))
    }
    if (typeof schema !== 'object') return findings

    for (const [key, value] of Object.entries(schema)) {
        findings.push(...auditJsonLdValues(route, value, `${path}.${key}`, key))
    }
    return findings
}

const auditPrimarySchema = (route, schemas) => {
    const findings = []
    const primarySchemas = schemas.filter((schema) => !SUPPLEMENTAL_SCHEMA_TYPES.has(schema['@type']))

    if (primarySchemas.length !== 1) {
        findings.push(
            finding(
                'jsonld-primary-count',
                route.file,
                `expected one primary JSON-LD object, found ${primarySchemas.length}`
            )
        )
        return findings
    }

    const primary = primarySchemas[0]
    const fields = PRIMARY_SCHEMA_FIELDS[primary['@type']]
    if (!fields) {
        findings.push(
            finding('jsonld-primary-type', route.file, `unsupported primary type ${String(primary['@type'])}`)
        )
        return findings
    }

    const allowed = new Set(['@context', '@type', ...fields.required, ...fields.optional])
    for (const key of Object.keys(primary)) {
        if (!allowed.has(key)) {
            findings.push(
                finding(
                    'jsonld-field-forbidden',
                    route.file,
                    `${primary['@type']} must not emit top-level field ${key}`
                )
            )
        }
    }
    for (const key of fields.required) {
        if (!(key in primary) || primary[key] === null || primary[key] === '') {
            findings.push(finding('jsonld-field-required', route.file, `${primary['@type']} requires field ${key}`))
        }
    }

    return findings
}

const auditFaqVisibility = (route, snapshot, schemas) => {
    const findings = []

    for (const faq of schemas.filter((schema) => schema['@type'] === 'FAQPage')) {
        if (!Array.isArray(faq.mainEntity) || faq.mainEntity.length < 2) {
            findings.push(finding('faq-shape', route.file, 'FAQPage must contain at least two questions'))
            continue
        }
        for (const [index, question] of faq.mainEntity.entries()) {
            const name = normalizeText(typeof question?.name === 'string' ? question.name : '')
            const answer = normalizeText(
                typeof question?.acceptedAnswer?.text === 'string' ? question.acceptedAnswer.text : ''
            )
            if (!name || !answer) {
                findings.push(
                    finding('faq-shape', route.file, `FAQ question ${index + 1} needs visible name and answer`)
                )
                continue
            }
            if (!snapshot.visibleText.includes(name)) {
                findings.push(finding('faq-question-hidden', route.file, `FAQ question is not visible: ${name}`))
            }
            if (!snapshot.visibleText.includes(answer)) {
                findings.push(finding('faq-answer-hidden', route.file, `FAQ answer is not visible for: ${name}`))
            }
        }
    }

    return findings
}

const isNoindex = (snapshot) =>
    snapshot.robots.some((value) =>
        value
            .toLowerCase()
            .split(',')
            .map((directive) => directive.trim())
            .includes('noindex')
    )

const auditPageMetadata = (state, route) => {
    const findings = []
    const snapshot = inspectRoute(state, route)
    const noindex = isNoindex(snapshot)

    if (noindex) {
        if (snapshot.robots.length !== 1 || snapshot.robots[0].toLowerCase() !== 'noindex') {
            findings.push(
                finding('noindex-directive', route.file, 'hidden pages must emit exactly one robots noindex directive')
            )
        }
        for (const [code, values] of [
            ['noindex-canonical', snapshot.canonicalHrefs],
            ['noindex-hreflang', snapshot.alternates],
            ['noindex-jsonld', snapshot.jsonLdScripts],
            ['noindex-og-url', snapshot.ogUrls],
        ]) {
            if (values.length > 0) findings.push(finding(code, route.file, 'hidden page emits discovery metadata'))
        }
        return findings
    }

    const expectedCanonical = new URL(route.pathname, state.siteOrigin).href
    if (snapshot.canonicalHrefs.length !== 1 || snapshot.canonicalHrefs[0] !== expectedCanonical) {
        findings.push(finding('canonical', route.file, `expected one canonical URL ${expectedCanonical}`))
    }
    if (snapshot.ogUrls.length !== 1 || snapshot.ogUrls[0] !== expectedCanonical) {
        findings.push(finding('og-url', route.file, `expected one og:url ${expectedCanonical}`))
    }

    const alternates = new Map()
    for (const alternate of snapshot.alternates) {
        if (alternates.has(alternate.hreflang)) {
            findings.push(finding('hreflang-duplicate', route.file, `duplicate hreflang ${alternate.hreflang}`))
        }
        alternates.set(alternate.hreflang, alternate.href)
        const pathname = localPath(alternate.href, state.siteOrigin)
        if (pathname === null || !state.canonicalRoutes.has(pathname)) {
            findings.push(finding('hreflang-target', route.file, `hreflang target is not canonical: ${alternate.href}`))
        }
    }
    for (const language of ['en', 'fi', 'sv', 'x-default']) {
        if (!alternates.has(language)) {
            findings.push(finding('hreflang-missing', route.file, `missing hreflang ${language}`))
        }
    }
    if (alternates.get('x-default') !== alternates.get('fi')) {
        findings.push(finding('hreflang-default', route.file, 'x-default must match the Finnish alternate'))
    }

    if (snapshot.themeColors.length !== 1 || !snapshot.themeColors[0]) {
        findings.push(finding('theme-color', route.file, 'indexable page needs one non-empty theme-color meta tag'))
    }

    const parsed = parseJsonLd(snapshot, route)
    findings.push(...parsed.findings)
    findings.push(...parsed.schemas.flatMap((schema) => auditJsonLdValues(route, schema)))
    findings.push(...auditPrimarySchema(route, parsed.schemas))
    findings.push(...auditFaqVisibility(route, snapshot, parsed.schemas))
    return findings
}

export const auditPageMetadataOutput = (state) =>
    [...state.canonicalRoutes].map((pathname) => auditPageMetadata(state, state.htmlRoutes.get(pathname))).flat()

const parseXml = (content) => {
    const window = new Window()
    const document = new window.DOMParser().parseFromString(content, 'application/xml')
    window.close()
    return document
}

const readOutputFile = async (state, pathname) => {
    try {
        return await readFile(resolve(state.distDir, pathname.replace(/^\//, '')), 'utf8')
    } catch {
        return null
    }
}

const markdownLinks = (content) => {
    const tree = unified().use(remarkParse).parse(content)
    const links = []
    const visit = (node) => {
        if (node.type === 'link' && typeof node.url === 'string') links.push(node.url)
        if (Array.isArray(node.children)) node.children.forEach(visit)
    }
    visit(tree)
    return links
}

export const auditCrawlerResources = async (state) => {
    const findings = []
    const robots = await readOutputFile(state, '/robots.txt')
    const sitemapIndex = await readOutputFile(state, '/sitemap-index.xml')
    const llms = await readOutputFile(state, '/llms.txt')

    if (robots === null) {
        findings.push(finding('robots-missing', 'robots.txt', 'built output does not contain robots.txt'))
    } else {
        const sitemapDirective = robots.match(/^Sitemap:\s*(\S+)\s*$/im)?.[1]
        const expected = new URL('/sitemap-index.xml', state.siteOrigin).href
        if (sitemapDirective !== expected) {
            findings.push(finding('robots-sitemap', 'robots.txt', `expected sitemap directive ${expected}`))
        }
    }

    const sitemapPaths = new Set()
    if (sitemapIndex === null) {
        findings.push(
            finding('sitemap-index-missing', 'sitemap-index.xml', 'built output does not contain sitemap index')
        )
    } else {
        const indexDocument = parseXml(sitemapIndex)
        for (const loc of indexDocument.getElementsByTagName('loc')) {
            const sitemapPath = localPath(loc.textContent ?? '', state.siteOrigin)
            if (sitemapPath === null || !state.assetPaths.has(sitemapPath)) {
                findings.push(finding('sitemap-file', 'sitemap-index.xml', `missing sitemap ${loc.textContent}`))
                continue
            }
            const sitemap = await readOutputFile(state, sitemapPath)
            if (sitemap === null) continue
            const sitemapDocument = parseXml(sitemap)
            for (const entry of sitemapDocument.getElementsByTagName('url')) {
                const locs = entry.getElementsByTagName('loc')
                const lastmods = entry.getElementsByTagName('lastmod')
                const href = locs.length === 1 ? normalizeText(locs[0].textContent ?? '') : ''
                const pathname = localPath(href, state.siteOrigin)
                if (pathname === null || !state.canonicalRoutes.has(pathname)) {
                    findings.push(finding('sitemap-route', sitemapPath, `non-canonical sitemap URL ${href}`))
                } else {
                    sitemapPaths.add(pathname)
                    const snapshot = inspectRoute(state, state.htmlRoutes.get(pathname))
                    if (isNoindex(snapshot)) {
                        findings.push(
                            finding('sitemap-noindex', sitemapPath, `noindex route appears in sitemap: ${pathname}`)
                        )
                    }
                }
                if (lastmods.length !== 1 || !normalizeText(lastmods[0].textContent ?? '')) {
                    findings.push(finding('sitemap-lastmod', sitemapPath, `missing lastmod for ${href}`))
                }
            }
        }
    }

    if (llms === null) {
        findings.push(finding('llms-missing', 'llms.txt', 'built output does not contain llms.txt'))
    } else {
        const paths = []
        for (const href of markdownLinks(llms)) {
            const pathname = localPath(href, state.siteOrigin)
            paths.push(pathname)
            if (pathname === null || !state.canonicalRoutes.has(pathname)) {
                findings.push(finding('llms-url', 'llms.txt', `URL is not a generated canonical route: ${href}`))
            } else if (state.redirectSources.has(pathname)) {
                findings.push(finding('llms-redirect', 'llms.txt', `URL is a redirect source: ${href}`))
            } else if (isNoindex(inspectRoute(state, state.htmlRoutes.get(pathname)))) {
                findings.push(finding('llms-noindex', 'llms.txt', `URL is noindex: ${href}`))
            }
        }
        for (const pillar of ['/fi/', '/fi/about/', '/fi/blog/']) {
            if (!paths.includes(pillar))
                findings.push(finding('llms-pillar', 'llms.txt', `missing pillar URL ${pillar}`))
        }
    }

    return findings
}

export const auditDist = async (options) => {
    const state = await loadDistState(options)
    return [
        ...auditRedirectRules(state),
        ...auditFinnishAliases(state),
        ...auditInternalLinks(state),
        ...auditPageMetadataOutput(state),
        ...(await auditCrawlerResources(state)),
    ]
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
