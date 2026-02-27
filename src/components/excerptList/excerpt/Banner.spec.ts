import { getByRole, queryByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import Banner from './Banner.astro'

describe('<Banner />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Banner, {
            props: {
                slug: 'test-slug',
                title: 'Test Title',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link', async () => {
        const result = await renderAstroComponent(Banner, {
            props: {
                slug: 'test-slug',
                title: 'Test Title',
            },
        })

        const link = getByRole(result, 'link', { name: /Test Title/i })
        expect(link).toBeDefined()
        expect(link).toHaveAttribute('href', '/test-slug/')
    })

    it('should render heading with title', async () => {
        const result = await renderAstroComponent(Banner, {
            props: {
                slug: 'my-article',
                title: 'My Article',
            },
        })

        const heading = getByRole(result, 'heading', { level: 2, name: /My Article/i })
        expect(heading).toBeDefined()
        expect(heading).toHaveTextContent('My Article')
    })

    it('should not render image when no local image provided', async () => {
        const result = await renderAstroComponent(Banner, {
            props: {
                slug: 'test-slug',
                title: 'Test Title',
            },
        })

        const image = queryByRole(result, 'img')
        expect(image).toBeNull()
    })

    it('should set permalink rel attribute', async () => {
        const result = await renderAstroComponent(Banner, {
            props: {
                slug: 'test-slug',
                title: 'Test Title',
            },
        })

        const link = getByRole(result, 'link', { name: /Test Title/i })
        expect(link).toHaveAttribute('rel', 'permalink')
    })
})
