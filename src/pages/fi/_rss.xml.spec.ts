import { describe, expect, it } from 'vitest'

import { allMdxPosts } from '../../lib/mdxPosts'
import { GET } from './rss.xml'

const SITE = new URL('https://laurilavanti.fi')

const makeContext = () => ({ site: SITE }) as Parameters<typeof GET>[0]

describe('fi/rss.xml', () => {
    it('returns a Response', async () => {
        const response = await GET(makeContext())
        expect(response).toBeInstanceOf(Response)
    })

    it('Content-Type is application/xml or text/xml', async () => {
        const response = await GET(makeContext())
        expect(response.headers.get('content-type')).toMatch(/xml/)
    })

    it('contains Finnish RSS title', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        expect(text).toContain('Lauri Lavanti – blogi')
    })

    it('contains Finnish RSS description', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        expect(text).toContain('Lauri Lavantin blogikirjoitukset')
    })

    it('contains all Finnish post titles', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')

        for (const post of fiPosts) {
            expect(text, `missing title: ${post.title}`).toContain(post.title)
        }
    })

    it('contains no non-Finnish posts', async () => {
        const response = await GET(makeContext())
        const text = await response.text()
        const nonFiPosts = allMdxPosts.filter((p) => p.lang !== 'fi')

        for (const post of nonFiPosts) {
            expect(text, `unexpected non-fi post: ${post.url}`).not.toContain(post.url)
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

    it('contains Finnish byline text', async () => {
        const text = await GET(makeContext()).then((r) => r.text())
        expect(text).toContain('on julkaistu ensimmäisen kerran Lauri Lavantin blogissa')
    })
})
