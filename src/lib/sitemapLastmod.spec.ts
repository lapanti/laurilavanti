import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { tags } from '../content/tags'
import { buildPageDateMap, extractUpdatedDate } from './sitemapLastmod'

const PAGES_DIR = join(fileURLToPath(import.meta.url), '..', '..', 'pages')

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
    const map = buildPageDateMap({ pagesDir: PAGES_DIR, tags })

    it('maps a sample of known MDX pages', () => {
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
})
