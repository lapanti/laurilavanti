/**
 * publish-due.ts
 *
 * Scheduled-publishing check: finds posts whose publishDate has arrived
 * (Europe/Helsinki) but whose URL is missing from the live production
 * sitemap — i.e. posts that are due but not yet deployed. Self-healing:
 * a missed nightly run is caught by the next one.
 *
 * Exit codes (consumed by scheduled-publish.yml):
 *   0 — nothing due, live site is up to date
 *   1 — publish due: one or more post URLs are missing from the live sitemap
 *   2 — sitemap fetch/parse error
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/* eslint-disable import-x/extensions -- node --experimental-strip-types needs explicit extensions */
import { helsinkiDateOf, isPublishedBy } from '../../src/lib/publishing.ts'
import { extractSlug } from '../../src/lib/sitemapLastmod.ts'
/* eslint-enable import-x/extensions */

const LANGS = ['fi', 'sv', 'en'] as const

export interface DuePost {
    publishDate: string
    url: string
}

export function collectDuePosts(postsDir: string, today: string): DuePost[] {
    const due: DuePost[] = []

    for (const idDir of readdirSync(postsDir, { withFileTypes: true }).filter((e) => e.isDirectory())) {
        const dir = join(postsDir, idDir.name)
        const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'))
        const publishDate: string | undefined = meta.publishDate
        if (!publishDate || !isPublishedBy(publishDate, today)) continue

        for (const lang of LANGS) {
            const langPath = join(dir, `${lang}.mdx`)
            if (!existsSync(langPath)) continue
            const slug = extractSlug(readFileSync(langPath, 'utf8'))
            if (!slug) continue
            due.push({ publishDate, url: `/${lang}/blog/${idDir.name}/${slug}/` })
        }
    }

    return due
}

export function parseSitemapLocs(xml: string): string[] {
    const locs: string[] = []
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        locs.push(decodeURIComponent(new URL(match[1]).pathname))
    }

    return locs
}

export function findUnpublished(due: DuePost[], liveUrls: string[]): DuePost[] {
    const live = new Set(liveUrls)

    return due.filter((post) => !live.has(post.url))
}

const fetchSitemapPaths = async (url: string): Promise<string[]> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)

    return parseSitemapLocs(await res.text())
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
    const sitemapIndexUrl = process.argv[2] ?? 'https://lavanti.fi/sitemap-index.xml'
    const postsDir = join(fileURLToPath(import.meta.url), '..', '..', '..', 'src', 'content', 'posts')
    const today = helsinkiDateOf(new Date())

    try {
        const childPaths = await fetchSitemapPaths(sitemapIndexUrl)
        const liveUrls: string[] = []
        for (const path of childPaths) {
            liveUrls.push(...(await fetchSitemapPaths(new URL(path, sitemapIndexUrl).href)))
        }

        const unpublished = findUnpublished(collectDuePosts(postsDir, today), liveUrls)
        if (unpublished.length === 0) {
            process.stdout.write('Nothing to publish: all due posts are live.\n')
            process.exit(0)
        }

        process.stdout.write(`Publish due (${unpublished.length}):\n`)
        for (const post of unpublished) {
            process.stdout.write(`  ${post.url}  (publishDate: ${post.publishDate})\n`)
        }
        process.exit(1)
    } catch (error) {
        process.stderr.write(`publish-due: sitemap check failed: ${String(error)}\n`)
        process.exit(2)
    }
}
