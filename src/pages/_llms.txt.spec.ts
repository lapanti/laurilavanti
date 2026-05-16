import { describe, expect, it } from 'vitest'

import { tags } from '../content/tags'
import { allMdxPosts } from '../lib/mdxPosts'
import { getLlmsTxt } from './llms.txt'

const SITE = new URL('https://laurilavanti.fi')

const content = getLlmsTxt(SITE)

describe('getLlmsTxt — header', () => {
    it('starts with H1 "# Lauri Lavanti"', () => {
        expect(content.startsWith('# Lauri Lavanti\n')).toBe(true)
    })

    it('contains the Finnish blockquote', () => {
        expect(content).toContain(
            '> Lauri Lavanti on kirkkonummelainen poliitikko ja lead developer, joka kirjoittaa teknologiasta, kunnallispolitiikasta ja yhteiskunnasta.'
        )
    })
})

describe('getLlmsTxt — pillar pages section', () => {
    it('contains "## Tärkeimmät sivut" heading', () => {
        expect(content).toContain('## Tärkeimmät sivut')
    })

    it('links Etusivu to /fi/', () => {
        expect(content).toContain('[Etusivu](https://laurilavanti.fi/fi/)')
    })

    it('links Aiheet to /fi/topics', () => {
        expect(content).toContain('[Aiheet](https://laurilavanti.fi/fi/topics)')
    })

    it('links Laurista to /fi/about', () => {
        expect(content).toContain('[Laurista](https://laurilavanti.fi/fi/about)')
    })
})

describe('getLlmsTxt — tag sections', () => {
    it('artificial-intelligence section appears before other tag sections', () => {
        const aiIdx = content.indexOf('## Tekoäly')
        const otherTagSections = tags
            .filter((t) => t.id !== 'artificial-intelligence')
            .map((t) => content.indexOf(`## ${t.names.fi}`))
            .filter((idx) => idx !== -1)

        expect(aiIdx).toBeGreaterThan(-1)
        for (const idx of otherTagSections) {
            expect(aiIdx).toBeLessThan(idx)
        }
    })

    it('all published Finnish posts appear under their tags', () => {
        const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')
        for (const post of fiPosts) {
            for (const tag of post.tags) {
                const postUrl = new URL(post.url, SITE).href
                expect(content, `post "${post.title}" missing under tag "${tag}"`).toContain(
                    `[${post.title}](${postUrl})`
                )
            }
        }
    })

    it('unique Finnish post count matches allMdxPosts fi count', () => {
        const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')
        const urlPattern = /\[.+?\]\((https:\/\/laurilavanti\.fi\/fi\/blog\/[^)]+)\)/g

        // Collect all unique post URLs from tag sections (before multilingual section)
        const multilingualIdx = content.indexOf('## Muut kielet')
        const tagSectionContent = content.slice(0, multilingualIdx)
        const matches = [...tagSectionContent.matchAll(urlPattern)]
        const uniqueUrls = new Set(matches.map((m) => m[1]))

        expect(uniqueUrls.size).toBe(fiPosts.length)
    })

    it('posts within each tag section are sorted newest-first by id', () => {
        const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')

        // Split content into per-section chunks to measure ordering within each section
        const sectionChunks = content.split(/\n(?=## )/)

        for (const tag of tags) {
            const tagPosts = fiPosts.filter((p) => p.tags.includes(tag.id))
            if (tagPosts.length < 2) continue

            const tagName = tag.names.fi
            const chunk = sectionChunks.find((c) => c.startsWith(`## ${tagName}\n`))
            if (!chunk) continue

            const positions = tagPosts.map((p) => ({
                id: p.id,
                pos: chunk.indexOf(new URL(p.url, SITE).href),
            }))

            for (let i = 1; i < positions.length; i++) {
                if (positions[i - 1].pos === -1 || positions[i].pos === -1) continue
                expect(
                    positions[i - 1].pos,
                    `tag "${tag.id}": post id=${positions[i - 1].id} should appear before id=${positions[i].id}`
                ).toBeLessThan(positions[i].pos)
            }
        }
    })

    it('omits tag sections with zero Finnish posts', () => {
        const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')
        const emptyTags = tags.filter((t) => fiPosts.every((p) => !p.tags.includes(t.id)))

        for (const tag of emptyTags) {
            expect(content).not.toContain(`## ${tag.names.fi}`)
        }
    })
})

describe('getLlmsTxt — multilingual section', () => {
    it('contains multilingual heading', () => {
        expect(content).toContain('## Muut kielet / Other languages / Andra språk')
    })

    it('all published English posts appear in multilingual section', () => {
        const enPosts = allMdxPosts.filter((p) => p.lang === 'en')
        const multilingualSection = content.slice(content.indexOf('## Muut kielet'))

        for (const post of enPosts) {
            expect(multilingualSection, `EN post "${post.title}" missing`).toContain(
                `[${post.title}](${new URL(post.url, SITE).href})`
            )
        }
    })

    it('all published Swedish posts appear in multilingual section', () => {
        const svPosts = allMdxPosts.filter((p) => p.lang === 'sv')
        const multilingualSection = content.slice(content.indexOf('## Muut kielet'))

        for (const post of svPosts) {
            expect(multilingualSection, `SV post "${post.title}" missing`).toContain(
                `[${post.title}](${new URL(post.url, SITE).href})`
            )
        }
    })
})
