import { describe, expect, it } from 'vitest'

import { allMdxPosts } from '../../lib/mdxPosts'
import { GET } from './rss.xml'

const SITE = new URL('https://laurilavanti.fi')

const makeContext = () => ({ site: SITE }) as Parameters<typeof GET>[0]

describe('sv/rss.xml', () => {
    it('contains Swedish RSS title', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        expect(text).toContain('Lauri Lavanti – blogg')
    })

    it('contains Swedish RSS description', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        expect(text).toContain('Lauri Lavantis blogginlägg')
    })

    it('contains all Swedish post titles', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        const svPosts = allMdxPosts.filter((p) => p.lang === 'sv')

        for (const post of svPosts) {
            expect(text, `missing title: ${post.title}`).toContain(post.title)
        }
    })

    it('contains no non-Swedish posts', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        const nonSvPosts = allMdxPosts.filter((p) => p.lang !== 'sv')

        for (const post of nonSvPosts) {
            expect(text, `unexpected non-sv post: ${post.url}`).not.toContain(post.url)
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

    it('contains Swedish byline text', async () => {
        const text = await GET(makeContext()).then((r) => r.text())
        expect(text).toContain('Permanent länk till blogginlägget')
    })
})
