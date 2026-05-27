import { describe, expect, it } from 'vitest'

import { allMdxPosts } from '../../lib/mdxPosts'
import { GET } from './rss.xml'

const SITE = new URL('https://laurilavanti.fi')

const makeContext = () => ({ site: SITE }) as Parameters<typeof GET>[0]

describe('en/rss.xml', () => {
    it('contains English RSS title', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        expect(text).toContain('Lauri Lavanti – blog')
    })

    it('contains English RSS description', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        expect(text).toContain('Blog posts by Lauri Lavanti')
    })

    it('contains all English post titles', async () => {
        const response = await GET(makeContext())
        const raw = await response.text()
        // Normalise XML entities and soft-hyphens for comparison
        const text = raw.replace(/&apos;/g, "'").replace(/­|&#xAD;|­/g, '')
        const enPosts = allMdxPosts.filter((p) => p.lang === 'en')

        for (const post of enPosts) {
            const title = post.title.replace(/­/g, '')
            expect(text, `missing title: ${title}`).toContain(title)
        }
    })

    it('contains no non-English posts', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        const nonEnPosts = allMdxPosts.filter((p) => p.lang !== 'en')

        for (const post of nonEnPosts) {
            expect(text, `unexpected non-en post: ${post.url}`).not.toContain(post.url)
        }
    })

    it('contains content:encoded for posts', async () => {
        const text = await GET(makeContext()).then((r) => r.text())
        expect(text).toContain('content:encoded')
    })

    it('contains enclosure for posts', async () => {
        const text = await GET(makeContext()).then((r) => r.text())
        expect(text).toContain('<enclosure')
    })

    it('contains media:content for posts', async () => {
        const text = await GET(makeContext()).then((r) => r.text())
        expect(text).toContain('<media:content')
    })

    it('contains English byline text', async () => {
        const text = await GET(makeContext()).then((r) => r.text())
        expect(text).toContain('was first published on Lauri Lavanti')
    })
})
