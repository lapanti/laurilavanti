/**
 * dist-head.mjs
 *
 * Built-HTML head guardrail. Scans every page in the build output (dist/ by
 * default) and asserts the SEO-critical head tags survived the layout → Head
 * prop wiring. Unit tests cover Head.astro's own logic; this check catches a
 * layout silently dropping a prop, which no unit test can see.
 *
 * Checks per indexable page (redirect stubs and noindex pages are skipped):
 *   - exactly one non-empty <title>
 *   - non-empty meta description
 *   - canonical present, absolute on the site origin, trailing slash, and
 *     pointing at the page's own path
 *   - hreflang links for exactly fi+sv+en plus x-default equal to the fi URL
 *   - every hreflang target exists as a built page (guards the locale-swap
 *     fallback in Head.astro against pages shipped in fewer than 3 locales)
 *   - og:title, og:description and og:url present; og:url equals canonical
 *   - og:image present on blog post pages
 *   - RSS autodiscovery link matching the page locale
 *   - every JSON-LD block parses, declares schema.org and a known @type;
 *     blog post pages carry a BlogPosting with datePublished
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join, sep } from 'node:path'
import process from 'node:process'

const SITE = 'https://lavanti.fi'
const LANGS = ['fi', 'sv', 'en']
const KNOWN_JSONLD_TYPES = new Set([
    'BlogPosting',
    'BreadcrumbList',
    'CollectionPage',
    'FAQPage',
    'Person',
    'ProfilePage',
    'WebPage',
    'WebSite',
])
const POST_PATH_RE = /^\/(fi|sv|en)\/blog\/\d+\/.+\/$/

/** URL pathname with percent-encoding decoded, so it compares against raw dist dir names. */
const urlPath = (href) => decodeURIComponent(new URL(href).pathname)

/** Parse the attributes of a single HTML tag into an object (order-agnostic). */
export function parseAttrs(tag) {
    const attrs = {}
    for (const m of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) {
        attrs[m[1]] = m[2]
    }
    return attrs
}

/** Collect all tags with the given name from an HTML document. */
export function findTags(html, tagName) {
    return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'g'))].map((m) => parseAttrs(m[0]))
}

/** True for redirect stubs and noindex pages, which carry no SEO head. */
export function isSkippablePage(html) {
    if (/http-equiv="refresh"/.test(html)) return true
    return findTags(html, 'meta').some((t) => t.name === 'robots' && /noindex/.test(t.content ?? ''))
}

/** Recursively collect built pages as { pagePath: html } (dist-relative URL paths). */
export function collectPages(distDir) {
    const pages = new Map()
    const walk = (dir) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name)
            if (entry.isDirectory()) walk(full)
            else if (entry.name === 'index.html') {
                const rel = full.slice(distDir.length).split(sep).join('/')
                pages.set(rel.replace(/index\.html$/, ''), readFileSync(full, 'utf8'))
            }
        }
    }
    walk(distDir)
    return pages
}

/** Check one page; returns a list of problem descriptions (empty = ok). */
export function checkPage(html, pagePath, builtPaths) {
    const problems = []
    const isPost = POST_PATH_RE.test(pagePath)
    const lang = pagePath.split('/')[1]

    const titles = [...html.matchAll(/<title[^>]*>([^<]*)<\/title>/g)].map((m) => m[1].trim())
    if (titles.length !== 1) problems.push(`expected exactly one <title>, found ${titles.length}`)
    else if (!titles[0]) problems.push('empty <title>')

    const metas = findTags(html, 'meta')
    const meta = (name, key = 'name') => metas.filter((t) => t[key] === name)

    if (!meta('description').some((t) => (t.content ?? '').trim())) problems.push('missing or empty meta description')

    const links = findTags(html, 'link')
    const canonicals = links.filter((t) => t.rel === 'canonical')
    if (canonicals.length !== 1) {
        problems.push(`expected exactly one canonical link, found ${canonicals.length}`)
    } else {
        const href = canonicals[0].href ?? ''
        if (!href.startsWith(`${SITE}/`)) problems.push(`canonical is not absolute on ${SITE}: "${href}"`)
        else if (!href.endsWith('/')) problems.push(`canonical lacks trailing slash: "${href}"`)
        else if (urlPath(href) !== pagePath)
            problems.push(`canonical path "${urlPath(href)}" differs from page path "${pagePath}"`)
    }

    const hreflangs = links.filter((t) => t.rel === 'alternate' && t.hreflang)
    const byLang = new Map(hreflangs.map((t) => [t.hreflang, t.href]))
    const expected = [...LANGS, 'x-default']
    if (hreflangs.length !== expected.length || !expected.every((l) => byLang.has(l))) {
        problems.push(
            `expected hreflang set ${expected.join(',')}, found ${hreflangs.map((t) => t.hreflang).join(',') || 'none'}`
        )
    } else {
        if (byLang.get('x-default') !== byLang.get('fi'))
            problems.push(`x-default "${byLang.get('x-default')}" differs from fi "${byLang.get('fi')}"`)
        for (const [hl, href] of byLang) {
            if (!href?.startsWith(`${SITE}/`)) {
                problems.push(`hreflang ${hl} is not absolute on ${SITE}: "${href}"`)
            } else if (!builtPaths.has(urlPath(href))) {
                problems.push(`hreflang ${hl} points at "${urlPath(href)}" which is not a built page`)
            }
        }
    }

    for (const prop of ['og:title', 'og:description', 'og:url']) {
        if (!meta(prop, 'property').some((t) => (t.content ?? '').trim())) problems.push(`missing ${prop}`)
    }
    const ogUrl = meta('og:url', 'property')[0]?.content
    if (ogUrl && canonicals[0]?.href && ogUrl !== canonicals[0].href)
        problems.push(`og:url "${ogUrl}" differs from canonical "${canonicals[0].href}"`)
    if (isPost && !meta('og:image', 'property').some((t) => (t.content ?? '').trim()))
        problems.push('post page missing og:image')

    if (LANGS.includes(lang)) {
        const rss = links.filter((t) => t.rel === 'alternate' && t.type === 'application/rss+xml')
        if (!rss.some((t) => t.href === `/${lang}/rss.xml`))
            problems.push(`missing RSS autodiscovery link for /${lang}/rss.xml`)
    }

    const jsonldBlocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1])
    if (jsonldBlocks.length === 0) problems.push('no JSON-LD blocks')
    const parsedTypes = []
    for (const block of jsonldBlocks) {
        try {
            const data = JSON.parse(block)
            if (!String(data['@context'] ?? '').includes('schema.org'))
                problems.push(`JSON-LD block missing schema.org @context`)
            if (!KNOWN_JSONLD_TYPES.has(data['@type'])) problems.push(`unknown JSON-LD @type "${data['@type']}"`)
            parsedTypes.push(data)
        } catch {
            problems.push('JSON-LD block does not parse as JSON')
        }
    }
    if (isPost) {
        const posting = parsedTypes.find((d) => d['@type'] === 'BlogPosting')
        if (!posting) problems.push('post page missing BlogPosting JSON-LD')
        else if (!posting.datePublished) problems.push('BlogPosting JSON-LD missing datePublished')
    }

    return problems
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].split(sep).join('/'))

if (isMain) {
    const distDir = process.argv[2] ?? 'dist'
    const pages = collectPages(distDir)
    if (pages.size === 0) {
        process.stderr.write(`\x1b[31mERROR\x1b[0m [dist-head] no index.html files found under "${distDir}"\n`)
        process.exit(1)
    }

    const builtPaths = new Set(pages.keys())
    let checked = 0
    let hasError = false
    for (const [pagePath, html] of pages) {
        if (isSkippablePage(html)) continue
        checked += 1
        for (const problem of checkPage(html, pagePath, builtPaths)) {
            process.stderr.write(`\x1b[31mERROR\x1b[0m [dist-head] ${pagePath}: ${problem}\n`)
            hasError = true
        }
    }

    if (checked === 0) {
        process.stderr.write(`\x1b[31mERROR\x1b[0m [dist-head] every page was skipped — check the skip heuristics\n`)
        process.exit(1)
    }
    if (!hasError) console.log(`OK: ${checked} indexable pages verified (${pages.size} built pages scanned)`)
    process.exit(hasError ? 1 : 0)
}
