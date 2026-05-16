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
})
