import { describe, expect, it } from 'vitest'

import { allMdxPosts, getPostAlternates } from './mdxPosts'

const VALID_LANGS = ['en', 'fi', 'sv'] as const
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

describe('allMdxPosts frontmatter validation', () => {
    it('should have at least one post', () => {
        expect(allMdxPosts.length).toBeGreaterThan(0)
    })

    it.each(allMdxPosts)('$url — required fields are present and valid', (post) => {
        expect(post.id, 'id must be a positive integer').toBeGreaterThan(0)
        expect(post.lang, 'lang must be fi, sv or en').toSatisfy((v: string) =>
            (VALID_LANGS as readonly string[]).includes(v)
        )
        expect(post.title, 'title must be a non-empty string').toBeTypeOf('string')
        expect(post.title.trim().length, 'title must not be blank').toBeGreaterThan(0)
        expect(post.description, 'description must be a non-empty string').toBeTypeOf('string')
        expect(post.description.trim().length, 'description must not be blank').toBeGreaterThan(0)
        expect(post.publishDate, 'publishDate must be YYYY-MM-DD').toMatch(ISO_DATE)
        expect(post.slug, 'slug must be a non-empty string').toBeTypeOf('string')
        expect(post.slug.trim().length, 'slug must not be blank').toBeGreaterThan(0)
        expect(Array.isArray(post.tags), 'tags must be an array').toBe(true)
        expect(post.heroImage, 'heroImage must be a non-empty string').toBeTypeOf('string')
        expect(post.heroImage.trim().length, 'heroImage must not be blank').toBeGreaterThan(0)
        expect(post.alt, 'alt must be a non-empty string').toBeTypeOf('string')
        expect(post.alt.trim().length, 'alt must not be blank').toBeGreaterThan(0)
    })

    it('updatedDate, when present, must be YYYY-MM-DD', () => {
        const postsWithUpdatedDate = allMdxPosts.filter((p) => p.updatedDate !== undefined)
        for (const post of postsWithUpdatedDate) {
            expect(post.updatedDate, `${post.url} updatedDate must be YYYY-MM-DD`).toMatch(ISO_DATE)
        }
    })

    it('should be sorted newest-first by publishDate', () => {
        for (let i = 1; i < allMdxPosts.length; i++) {
            const prev = new Date(allMdxPosts[i - 1].publishDate).valueOf()
            const curr = new Date(allMdxPosts[i].publishDate).valueOf()
            expect(prev, `post ${i - 1} should not be older than post ${i}`).toBeGreaterThanOrEqual(curr)
        }
    })

    it('should have unique ids per language', () => {
        for (const lang of VALID_LANGS) {
            const ids = allMdxPosts.filter((p) => p.lang === lang).map((p) => p.id)
            expect(new Set(ids).size, `duplicate ids found for lang=${lang}`).toBe(ids.length)
        }
    })

    it('should have unique slugs per language', () => {
        for (const lang of VALID_LANGS) {
            const slugs = allMdxPosts.filter((p) => p.lang === lang).map((p) => p.slug)
            expect(new Set(slugs).size, `duplicate slugs found for lang=${lang}`).toBe(slugs.length)
        }
    })
})

describe('getPostAlternates', () => {
    it('returns a URL for each locale for a known post id', () => {
        const alternates = getPostAlternates(10)
        expect(Object.keys(alternates).sort()).toEqual(['en', 'fi', 'sv'])
    })

    it('returns the correct locale-prefixed URLs', () => {
        const alternates = getPostAlternates(10)
        expect(alternates.fi).toBe('/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/')
        expect(alternates.sv).toBe('/sv/blog/10/sote-ar-valfardssallets-hordsten/')
        expect(alternates.en).toBe('/en/blog/10/sote-is-the-cornerstone-of-the-welfare-society/')
    })

    it('returns an empty object for an unknown post id', () => {
        const alternates = getPostAlternates(999999)
        expect(Object.keys(alternates)).toHaveLength(0)
    })
})
