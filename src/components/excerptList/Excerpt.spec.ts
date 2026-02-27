import { getByRole, getByText, queryByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Excerpt from './Excerpt.astro'

describe('<Excerpt />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: [],
                title: 'Test Article',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render list item', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: [],
                title: 'Test Article',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })

    it('should render article with aria-label', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: [],
                title: 'My Test Article',
            },
        })

        const article = getByRole(result, 'article', { name: /My Test Article/i })
        expect(article).toBeDefined()
    })

    it('should have correct schema.org itemtype', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: [],
                title: 'Test Article',
            },
        })

        const article = getByRole(result, 'article', { name: /Test Article/i })
        expect(article).toHaveAttribute('itemtype', 'https://schema.org/CreativeWork')
    })

    it('should have itemscope attribute', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: [],
                title: 'Test Article',
            },
        })

        const article = getByRole(result, 'article', { name: /Test Article/i })
        expect(article).toHaveAttribute('itemscope')
    })

    it('should render Banner component', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: [],
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        const link = getByRole(result, 'link', { name: /Test Article/i })
        expect(link).toBeDefined()
    })

    it('should render Description component', async () => {
        const excerpt = 'Test excerpt'
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: [],
                excerpt,
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        expect(getByText(result, excerpt)).toBeDefined()
    })

    it('should render Meta when date and tags are provided', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: { items: [{ name: 'kissa', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                date: '2024-01-01',
                slug: 'test-article',
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title: 'Test Article',
            },
        })

        expect(getByRole(result, 'complementary', { name: /Kirjoituksen "Test Article" meta-tiedot/i })).toBeDefined()
    })

    it('should not render Meta when date is missing', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: { items: [{ name: 'kissa', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                slug: 'test-article',
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title: 'Test Article',
            },
        })

        expect(queryByRole(result, 'complementary')).toBeNull()
    })

    it('should not render Meta when tags are missing', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: { items: [{ name: 'kissa', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                date: '2024-01-01',
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        expect(queryByRole(result, 'complementary')).toBeNull()
    })

    it('should render with all props', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: { items: [{ name: 'kissa', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                date: '2024-01-01',
                excerpt: 'Test excerpt',
                slug: 'test-article',
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title: 'Test Article',
            },
        })

        expect(getByRole(result, 'article', { name: /Test Article/i })).toBeDefined()
    })

    it('should render Meta with English aria-label when lang is en', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: { items: [{ name: 'kissa', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                date: '2024-01-01',
                lang: 'en',
                slug: 'test-article',
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title: 'Test Article',
            },
        })

        expect(getByRole(result, 'complementary', { name: /Meta information for post "Test Article"/i })).toBeDefined()
    })

    it('should render Meta with Swedish aria-label when lang is sv', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                allTags: { items: [{ name: 'kissa', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                date: '2024-01-01',
                lang: 'sv',
                slug: 'test-article',
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title: 'Test Article',
            },
        })

        expect(
            getByRole(result, 'complementary', { name: /Metainformation för inlägget "Test Article"/i })
        ).toBeDefined()
    })
})
