import { getByRole, queryByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import Banner from './Banner.astro'

describe('<Banner />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Banner, {
            props: {
                image: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
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

    it('should render image when provided', async () => {
        const result = await renderAstroComponent(Banner, {
            props: {
                image: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
                slug: 'test-slug',
                title: 'Test Title',
            },
        })

        const image = getByRole(result, 'img', { name: /Test image/i })
        expect(image).toBeDefined()
        expect(image).toHaveAttribute('alt', 'Test image')
    })

    it('should not render image when not provided', async () => {
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
