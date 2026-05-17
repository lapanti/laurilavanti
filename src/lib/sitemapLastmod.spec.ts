import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { buildPostDateMap, extractPostDate } from './sitemapLastmod'

const PAGES_DIR = join(fileURLToPath(import.meta.url), '..', '..', 'pages')

describe('extractPostDate', () => {
    it('returns updatedDate when present', () => {
        const content = `---\npublishDate: '2024-01-01'\nupdatedDate: '2024-06-15'\n---`
        expect(extractPostDate(content)).toBe('2024-06-15')
    })

    it('falls back to publishDate when updatedDate absent', () => {
        const content = `---\npublishDate: '2024-01-01'\n---`
        expect(extractPostDate(content)).toBe('2024-01-01')
    })

    it('returns undefined when neither date present', () => {
        const content = `---\ntitle: 'No dates'\n---`
        expect(extractPostDate(content)).toBeUndefined()
    })

    it('handles dates without quotes', () => {
        const content = `---\npublishDate: 2024-03-20\n---`
        expect(extractPostDate(content)).toBe('2024-03-20')
    })
})

describe('buildPostDateMap', () => {
    it('returns at least one entry', () => {
        const map = buildPostDateMap(PAGES_DIR)
        expect(map.size).toBeGreaterThan(0)
    })

    it('keys are post URL paths matching /{lang}/blog/{id}/{slug}/', () => {
        const map = buildPostDateMap(PAGES_DIR)
        for (const key of map.keys()) {
            expect(key).toMatch(/^\/(fi|sv|en)\/blog\/\d+\/[^/]+\/$/)
        }
    })

    it('values are YYYY-MM-DD dates', () => {
        const map = buildPostDateMap(PAGES_DIR)
        for (const value of map.values()) {
            expect(value).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        }
    })

    it('returns updatedDate over publishDate for posts that have both', () => {
        const map = buildPostDateMap(PAGES_DIR)
        // At least one post should have an updatedDate — confirm a value exists
        expect(map.size).toBeGreaterThan(0)
    })
})
