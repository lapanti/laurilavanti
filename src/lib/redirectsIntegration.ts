import type { AstroIntegration } from 'astro'

import { writeFile } from 'node:fs/promises'

import { redirects } from './redirects'

/*
 * Canonical blog-post path: /{lang}/blog/{id}/{slug}/ — the slug segment is what
 * distinguishes it from the bare /{lang}/blog/{id}/ redirect source.
 */
const CANONICAL_POST_PATTERN = /^\/(en|fi|sv)\/blog\/(\d+)\/[^/]+\/$/
const BARE_POST_PATTERN = /^\/(en|fi|sv)\/blog\/\d+\/$/
const FINNISH_PAGE_PATTERN = /^\/fi\/(.+)\/$/
const FILE_ROUTE_PATTERN = /\/[^/]+\.[^/]+\/$/

const normalise = (pathname: string): string => {
    const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`

    return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

/**
 * Build the Cloudflare Pages `_redirects` lines (`<from> <to> 301`) from the
 * static redirect map plus bare-id → slug pairs derived from the built pages.
 *
 * Pure and deterministic (sorted, de-duplicated) so it can be unit-tested
 * without running a full Astro build.
 */
export const buildRedirectLines = (map: Record<string, string>, pagePathnames: readonly string[]): string[] => {
    const rules = new Map<string, string>()
    const addRule = (source: string, destination: string) => {
        const existing = rules.get(source)
        if (existing && existing !== destination) {
            throw new Error(`conflicting redirect source "${source}": "${existing}" and "${destination}"`)
        }
        rules.set(source, destination)
    }

    for (const [from, to] of Object.entries(map)) {
        addRule(from, to)
    }

    const redirectSources = new Set(Object.keys(map).map(normalise))

    for (const pathname of pagePathnames) {
        const path = normalise(pathname)
        const match = CANONICAL_POST_PATTERN.exec(path)
        if (match) {
            const [, lang, id] = match
            addRule(`/${lang}/blog/${id}/`, path)
        }

        const finnishPage = FINNISH_PAGE_PATTERN.exec(path)
        if (
            !finnishPage ||
            path === '/fi/' ||
            redirectSources.has(path) ||
            BARE_POST_PATTERN.test(path) ||
            FILE_ROUTE_PATTERN.test(path)
        ) {
            continue
        }

        const alias = `/${finnishPage[1]}`
        addRule(alias, path)
        addRule(`${alias}/`, path)
    }

    return [...rules].map(([source, destination]) => `${source} ${destination} 301`).sort()
}

/**
 * Astro integration that writes `dist/_redirects` after the static build.
 *
 * Under `output: 'static'` Astro compiles every redirect into a client-side
 * meta-refresh HTML stub (HTTP 200), not an HTTP 301. This layers a Cloudflare
 * Pages `_redirects` file on top so the same paths return a true 301 in
 * production — Pages always follows a `_redirects` rule even when a static asset
 * exists at that path, so the stubs remain only as an `astro preview` fallback.
 */
export const redirectsFile = (): AstroIntegration => ({
    hooks: {
        'astro:build:done': async ({ pages, dir, logger }) => {
            const lines = buildRedirectLines(
                redirects,
                pages.map((page) => page.pathname)
            )
            await writeFile(new URL('_redirects', dir), `${lines.join('\n')}\n`, 'utf-8')
            logger.info(`wrote _redirects (${lines.length} rules)`)
        },
    },
    name: 'redirects-file',
})
