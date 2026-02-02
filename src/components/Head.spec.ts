import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Head from './Head.astro'

describe('<Head />', () => {
    it('should render with required props', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        expect(result).toBeDefined()
    })

    it('should set page title correctly', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const titleElement = result.querySelector('title')
        expect(titleElement?.textContent).toBe('Test Page | Lauri Lavanti')
    })

    it('should set base title when title is "Lauri Lavanti"', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Lauri Lavanti',
            },
        })

        const titleElement = result.querySelector('title')
        expect(titleElement?.textContent).toBe('Lauri Lavanti')
    })

    it('should set og:title meta tag', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const ogTitle = result.querySelector('meta[property="og:title"]')
        expect(ogTitle).toHaveAttribute('content', 'Test Page')
    })

    it('should set description meta tags', async () => {
        const description = 'Custom description'
        const result = await renderAstroComponent(Head, {
            props: {
                description,
                title: 'Test Page',
            },
        })

        const descMeta = result.querySelector('meta[name="description"]')
        const ogDescMeta = result.querySelector('meta[property="og:description"]')
        expect(descMeta).toHaveAttribute('content', description)
        expect(ogDescMeta).toHaveAttribute('content', description)
    })

    it('should set og:image meta tags when image is provided', async () => {
        const imageUrl = '//images.example.com/test.jpg'
        const imageAlt = 'Test image'
        const result = await renderAstroComponent(Head, {
            props: {
                image: {
                    fields: {
                        description: imageAlt,
                        file: {
                            details: {
                                image: {
                                    height: 600,
                                    width: 1200,
                                },
                            },
                            url: imageUrl,
                        },
                    },
                },
                title: 'Test Page',
            },
        })

        expect(result.querySelector('meta[property="og:image"]')).toHaveAttribute('content', `https:${imageUrl}`)
        expect(result.querySelector('meta[property="og:image:alt"]')).toHaveAttribute('content', imageAlt)
        expect(result.querySelector('meta[property="og:image:width"]')).toHaveAttribute('content', '1200')
        expect(result.querySelector('meta[property="og:image:height"]')).toHaveAttribute('content', '600')
    })

    it('should prefer croppedImage over image', async () => {
        const croppedImageUrl = '//images.example.com/cropped.jpg'
        const imageUrl = '//images.example.com/original.jpg'
        const result = await renderAstroComponent(Head, {
            props: {
                croppedImage: {
                    fields: {
                        description: 'Cropped',
                        file: {
                            details: {
                                image: { height: 600, width: 1200 },
                            },
                            url: croppedImageUrl,
                        },
                    },
                },
                image: {
                    fields: {
                        description: 'Original',
                        file: {
                            details: {
                                image: { height: 300, width: 600 },
                            },
                            url: imageUrl,
                        },
                    },
                },
                title: 'Test Page',
            },
        })

        expect(result.querySelector('meta[property="og:image"]')).toHaveAttribute('content', `https:${croppedImageUrl}`)
    })

    it('should include JSON-LD script tag', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        expect(jsonLdScript).toBeDefined()
    })

    it('should set BlogPosting JSON-LD when type is BLOGPOSTING', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-01-01',
                title: 'Test Blog Post',
                type: 'BlogPosting',
                updatedAt: '2024-01-02',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('BlogPosting')
        expect(jsonLd.datePublished).toBe('2024-01-01')
        expect(jsonLd.dateModified).toBe('2024-01-02')
    })

    it('should set author meta tag', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const authorMeta = result.querySelector('meta[name="author"]')
        expect(authorMeta).toHaveAttribute('content', 'Lauri Lavanti')
    })

    it('should set twitter card meta tag', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const twitterCard = result.querySelector('meta[name="twitter:card"]')
        expect(twitterCard).toHaveAttribute('content', 'summary')
    })

    it('should set twitter:card to summary_large_image when image is provided', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                image: {
                    fields: {
                        description: 'Test',
                        file: {
                            details: {
                                image: { height: 600, width: 1200 },
                            },
                            url: '//test.jpg',
                        },
                    },
                },
                title: 'Test Page',
            },
        })

        const twitterCard = result.querySelector('meta[name="twitter:card"]')
        expect(twitterCard).toHaveAttribute('content', 'summary_large_image')
    })
})
