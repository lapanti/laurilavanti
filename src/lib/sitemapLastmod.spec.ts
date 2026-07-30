import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { tags } from '../content/tags'
import { buildPageDateMap, extractUpdatedDate } from './sitemapLastmod'

const PAGES_DIR = join(fileURLToPath(import.meta.url), '..', '..', 'pages')
const POSTS_DIR = join(fileURLToPath(import.meta.url), '..', '..', 'content', 'posts')

describe('extractUpdatedDate', () => {
    it('returns updatedDate when present', () => {
        const content = `---\npublishDate: '2024-01-01'\nupdatedDate: '2024-06-15'\n---`
        expect(extractUpdatedDate(content)).toBe('2024-06-15')
    })

    it('returns undefined when updatedDate absent', () => {
        const content = `---\npublishDate: '2024-01-01'\n---`
        expect(extractUpdatedDate(content)).toBeUndefined()
    })

    it('handles dates without quotes', () => {
        const content = `---\nupdatedDate: 2024-03-20\n---`
        expect(extractUpdatedDate(content)).toBe('2024-03-20')
    })
})

describe('buildPageDateMap', () => {
    const map = buildPageDateMap({ pagesDir: PAGES_DIR, postsDir: POSTS_DIR, tags })

    it('maps a sample of known MDX pages and posts', () => {
        expect(map.get('/fi/about/')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(map.get('/en/blog/1/home-care-allowance-supplement/')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(map.get('/sv/newsletter/')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('every map value is a YYYY-MM-DD date', () => {
        for (const value of map.values()) {
            expect(value).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        }
    })

    it('maps every tag under all three locale category URLs', () => {
        for (const tag of tags) {
            for (const lang of ['fi', 'sv', 'en']) {
                const url = `/${lang}/category/${tag.id}/`
                expect(map.get(url)).toBe(tag.updatedDate)
            }
        }
    })

    it('throws when an MDX page lacks updatedDate', () => {
        const tmp = mkdtempSync(join(tmpdir(), 'sitemap-lastmod-'))
        try {
            const nested = join(tmp, 'fi', 'broken')
            mkdirSync(nested, { recursive: true })
            writeFileSync(join(nested, 'index.mdx'), `---\ntitle: 'No date'\n---\n`)
            expect(() => buildPageDateMap({ pagesDir: tmp, tags: [] })).toThrow(/missing required updatedDate/)
        } finally {
            rmSync(tmp, { force: true, recursive: true })
        }
    })

    it('emits one URL per present language file for a post', () => {
        const pagesDir = mkdtempSync(join(tmpdir(), 'sitemap-lastmod-pages-'))
        const postsDir = mkdtempSync(join(tmpdir(), 'sitemap-lastmod-posts-'))
        try {
            const postDir = join(postsDir, '99')
            mkdirSync(postDir, { recursive: true })
            writeFileSync(join(postDir, 'meta.json'), JSON.stringify({ updatedDate: '2026-01-05' }))
            writeFileSync(join(postDir, 'fi.mdx'), `---\nslug: 'esimerkki'\n---\n`)
            writeFileSync(join(postDir, 'en.mdx'), `---\nslug: 'example'\n---\n`)

            const map = buildPageDateMap({ pagesDir, postsDir, tags: [] })

            expect(map.get('/fi/blog/99/esimerkki/')).toBe('2026-01-05')
            expect(map.get('/en/blog/99/example/')).toBe('2026-01-05')
            expect(map.has('/sv/blog/99/')).toBe(false)
        } finally {
            rmSync(pagesDir, { force: true, recursive: true })
            rmSync(postsDir, { force: true, recursive: true })
        }
    })

    it('throws when a post lacks updatedDate in meta.json', () => {
        const pagesDir = mkdtempSync(join(tmpdir(), 'sitemap-lastmod-pages-'))
        const postsDir = mkdtempSync(join(tmpdir(), 'sitemap-lastmod-posts-'))
        try {
            const postDir = join(postsDir, '99')
            mkdirSync(postDir, { recursive: true })
            writeFileSync(join(postDir, 'meta.json'), JSON.stringify({}))
            writeFileSync(join(postDir, 'fi.mdx'), `---\nslug: 'esimerkki'\n---\n`)

            expect(() => buildPageDateMap({ pagesDir, postsDir, tags: [] })).toThrow(
                /missing required updatedDate\/slug/
            )
        } finally {
            rmSync(pagesDir, { force: true, recursive: true })
            rmSync(postsDir, { force: true, recursive: true })
        }
    })

    it('throws when a post language file lacks slug', () => {
        const pagesDir = mkdtempSync(join(tmpdir(), 'sitemap-lastmod-pages-'))
        const postsDir = mkdtempSync(join(tmpdir(), 'sitemap-lastmod-posts-'))
        try {
            const postDir = join(postsDir, '99')
            mkdirSync(postDir, { recursive: true })
            writeFileSync(join(postDir, 'meta.json'), JSON.stringify({ updatedDate: '2026-01-05' }))
            writeFileSync(join(postDir, 'fi.mdx'), `---\ntitle: 'No slug'\n---\n`)

            expect(() => buildPageDateMap({ pagesDir, postsDir, tags: [] })).toThrow(
                /missing required updatedDate\/slug/
            )
        } finally {
            rmSync(pagesDir, { force: true, recursive: true })
            rmSync(postsDir, { force: true, recursive: true })
        }
    })
})
