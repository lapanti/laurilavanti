import { getByRole, queryByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import ImageWithCaption from './ImageWithCaption.astro'

const mockImage = {
    fields: {
        description: 'Test image description',
        file: {
            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
        },
    },
}

describe('<ImageWithCaption />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'Test Caption',
                image: mockImage,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the figure element', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'Test Caption',
                image: mockImage,
            },
        })

        const figure = getByRole(result, 'figure')
        expect(figure).toBeDefined()
    })

    it('should render the Picture component', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'Test Caption',
                image: mockImage,
            },
        })

        const picture = getByRole(result, 'img')
        expect(picture).toBeDefined()
    })

    it('should render figure with correct text', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'My Image Caption',
                image: mockImage,
            },
        })

        const figcaption = getByRole(result, 'figure')
        expect(figcaption).toHaveTextContent('My Image Caption')
    })

    it('should set aria-label on figure', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'Accessible Caption',
                image: mockImage,
            },
        })

        const figure = getByRole(result, 'figure')
        expect(figure?.getAttribute('aria-label')).toBe('Accessible Caption')
    })

    it('should not render when image URL is missing', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'Test Caption',
                image: { fields: { file: {} } },
            },
        })

        const figure = queryByRole(result, 'figure')
        expect(figure).toBeNull()
    })

    it('should use image description as alt text', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'Test Caption',
                image: mockImage,
            },
        })

        const img = getByRole(result, 'img')
        expect(img?.getAttribute('alt')).toBe('Test image description')
    })

    it('should handle missing image description', async () => {
        const imageWithoutDescription = {
            fields: {
                file: { url: '//images.contentful.com/test.jpg' },
            },
        }

        try {
            await renderAstroComponent(ImageWithCaption, {
                props: {
                    caption: 'Test Caption',
                    image: imageWithoutDescription,
                },
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // eslint-disable-next-line vitest/no-conditional-expect
            expect(error.message).toBe(
                'Image missing "alt" property. "alt" text is required to describe important images on the page.'
            )
        }
    })
})
