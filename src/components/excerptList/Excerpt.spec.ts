import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Excerpt from './Excerpt.astro'

describe('<Excerpt />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                title: 'Test Article',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render list item', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                title: 'Test Article',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })

    it('should render article with aria-label', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                title: 'My Test Article',
            },
        })

        const article = getByRole(result, 'article', { name: /My Test Article/i })
        expect(article).toBeDefined()
    })

    it('should have correct schema.org itemtype', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                title: 'Test Article',
            },
        })

        const article = getByRole(result, 'article', { name: /Test Article/i })
        expect(article).toHaveAttribute('itemtype', 'https://schema.org/CreativeWork')
    })

    it('should have itemscope attribute', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                title: 'Test Article',
            },
        })

        const article = getByRole(result, 'article', { name: /Test Article/i })
        expect(article).toHaveAttribute('itemscope')
    })

    it('should render Banner component', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
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
                excerpt,
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        expect(getByText(result, excerpt)).toBeDefined()
    })

    it('should render the date as a formatted time element when provided', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                date: '2024-01-02',
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        const time = result.querySelector('time')
        expect(time).not.toBeNull()
        expect(time).toHaveAttribute('datetime', '2024-01-02')
        expect(time).toHaveTextContent('02.01.2024')
    })

    it('should not render a time element when date is missing', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        expect(result.querySelector('time')).toBeNull()
    })

    it('should render the localised tag names as chips', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                lang: 'fi',
                slug: 'test-article',
                tags: ['artificial-intelligence', 'economy'],
                title: 'Test Article',
            },
        })

        const chips = [...result.querySelectorAll('.tags li')].map((li) => li.textContent)
        expect(chips).toEqual(['Tekoäly', 'Talous'])
    })

    it('should not render a tag list when there are no tags', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        expect(result.querySelector('.tags')).toBeNull()
    })

    it('should skip tags that have no matching definition', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                lang: 'fi',
                slug: 'test-article',
                tags: ['artificial-intelligence', 'not-a-real-tag'],
                title: 'Test Article',
            },
        })

        const chips = [...result.querySelectorAll('.tags li')].map((li) => li.textContent)
        expect(chips).toEqual(['Tekoäly'])
    })

    it('should render with all props', async () => {
        const result = await renderAstroComponent(Excerpt, {
            props: {
                date: '2024-01-01',
                excerpt: 'Test excerpt',
                slug: 'test-article',
                title: 'Test Article',
            },
        })

        expect(getByRole(result, 'article', { name: /Test Article/i })).toBeDefined()
    })
})
