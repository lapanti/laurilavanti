import { getAllByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import { allMdxPosts } from '../lib/mdxPosts'
import ExcerptList from './ExcerptList.astro'

/*
 * Meta renders tags as <ul><li> per post, so getAllByRole('listitem') would
 * count nested tag items too. Count direct children of the outer <ul> instead.
 */
const countPosts = (result: HTMLElement): number => result.querySelector('ul')!.children.length

describe('<ExcerptList />', () => {
    it('should render a list', async () => {
        const result = await renderAstroComponent(ExcerptList, { props: { lang: 'fi' } })

        expect(result.querySelector('ul')).not.toBeNull()
    })

    it('should render list items', async () => {
        const result = await renderAstroComponent(ExcerptList, { props: { lang: 'fi' } })

        expect(countPosts(result)).toBeGreaterThan(0)
    })

    it('should filter by lang', async () => {
        const fiCount = allMdxPosts.filter((p) => p.lang === 'fi').length
        const enCount = allMdxPosts.filter((p) => p.lang === 'en').length

        const fiResult = await renderAstroComponent(ExcerptList, { props: { lang: 'fi' } })
        const enResult = await renderAstroComponent(ExcerptList, { props: { lang: 'en' } })

        expect(countPosts(fiResult)).toBe(fiCount)
        expect(countPosts(enResult)).toBe(enCount)
    })

    it('should limit results', async () => {
        const result = await renderAstroComponent(ExcerptList, { props: { lang: 'fi', limit: 2 } })

        expect(countPosts(result)).toBe(2)
    })

    it('should limit results to 1', async () => {
        const result = await renderAstroComponent(ExcerptList, { props: { lang: 'fi', limit: 1 } })

        expect(countPosts(result)).toBe(1)
    })

    it('should exclude post matching currentSlug', async () => {
        const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')
        const targetPost = fiPosts[0]

        const withoutExclusion = await renderAstroComponent(ExcerptList, { props: { lang: 'fi' } })
        const withExclusion = await renderAstroComponent(ExcerptList, {
            props: { currentSlug: targetPost.slug, lang: 'fi' },
        })

        expect(countPosts(withExclusion)).toBe(countPosts(withoutExclusion) - 1)
    })

    it('should filter by tag', async () => {
        const TAG = 'kirkkonummi'
        const expectedCount = allMdxPosts.filter((p) => p.lang === 'fi' && p.tags.includes(TAG)).length

        const result = await renderAstroComponent(ExcerptList, { props: { lang: 'fi', tag: TAG } })

        expect(countPosts(result)).toBe(expectedCount)
    })

    it('should sort by relatedTags with highest-scoring post first', async () => {
        const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')
        /*
         * Newest fi post (highest id) scores highest when all its own tags are passed as relatedTags.
         * Even in a tie, it wins the id-desc tiebreaker.
         */
        const referencePost = fiPosts[0]

        const result = await renderAstroComponent(ExcerptList, {
            props: { lang: 'fi', relatedTags: referencePost.tags },
        })

        const articles = getAllByRole(result, 'article')
        expect(articles[0].getAttribute('aria-label')).toBe(referencePost.title)
    })

    it('should render snapshot with limit', async () => {
        const result = await renderAstroComponent(ExcerptList, { props: { lang: 'fi', limit: 3 } })

        expect(result.firstChild).toMatchSnapshot()
    })
})
