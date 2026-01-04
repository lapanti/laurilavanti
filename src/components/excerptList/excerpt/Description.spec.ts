import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import Description from './Description.astro'

describe('<Description />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'Test excerpt',
                slug: 'test-slug',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'Test excerpt',
                slug: 'test-slug',
            },
        })

        const link = getByRole(result, 'link', { name: /Lue lisää »/ })
        expect(link).toBeDefined()
        expect(link).toHaveAttribute('href', '/test-slug/')
    })

    it('should render excerpt text', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'My test excerpt',
                slug: 'test-slug',
            },
        })

        expect(result).toHaveTextContent('My test excerpt')
    })

    it('should set permalink rel attribute on link', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'Test excerpt',
                slug: 'test-slug',
            },
        })

        const link = getByRole(result, 'link', { name: /Lue lisää »/ })
        expect(link).toHaveAttribute('rel', 'permalink')
    })

    it('should render link with correct text', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'Test excerpt',
                slug: 'test-slug',
            },
        })

        const link = getByRole(result, 'link', { name: /Lue lisää »/ })
        expect(link).toHaveTextContent('Lue lisää »')
    })

    it('should render without excerpt', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                slug: 'test-slug',
            },
        })

        const link = getByRole(result, 'link', { name: /Lue lisää »/ })
        expect(link).toBeDefined()
    })

    it('should render with itemProp description attribute', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'Test excerpt',
                slug: 'test-slug',
            },
        })

        expect(result.firstChild).toHaveAttribute('itemProp', 'description')
    })
})
