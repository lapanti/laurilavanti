import type { ImageDataLike } from 'gatsby-plugin-image'

import { BLOCKS } from '@contentful/rich-text-types'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import gatsbyConfig from '../../gatsby-config'
import { mainImage } from '../../tests/images.mock'
import Layout from './Layout'

interface SiteMetadata {
    title: string
    keywords: string[]
    author: string
    locale: string
    description: string
    siteUrl: string
    twSite: string
    twCreator: string
    facebook: string
    twitter: string
}

describe('<Layout />', () => {
    const title = 'Title'
    const children = 'Children'
    const { title: siteTitle } = gatsbyConfig.siteMetadata as unknown as SiteMetadata

    it('should render minimal', () => {
        const { container } = render(<Layout>{children}</Layout>)

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render title', async () => {
        const { container } = render(<Layout title={title}>{children}</Layout>)

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        await waitFor(() => expect(document.title).toEqual(`${title} | ${siteTitle}`))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hidden title', async () => {
        const { container } = render(<Layout hiddenTitle={title}>{children}</Layout>)

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.queryByRole('heading', { name: title })).toBeNull()
        await waitFor(() => expect(document.title).toEqual(`${title} | ${siteTitle}`))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hero image', () => {
        const { container } = render(
            <Layout heroImage={mainImage} title={title}>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('img', { name: title })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hero image with hidden title as alt', () => {
        const { container } = render(
            <Layout heroImage={mainImage} hiddenTitle={title}>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('img', { name: title })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render meta image', () => {
        const { container } = render(
            <Layout metaImage={mainImage} title={title}>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.queryByRole('img', { name: title })).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })

    describe('rich body', () => {
        it('should render Paragraph', () => {
            const paragraphText = 'Paragraph text'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    data: {},
                                    content: [
                                        {
                                            data: {},
                                            marks: [],
                                            value: paragraphText,
                                            nodeType: 'text',
                                        },
                                    ],
                                    nodeType: BLOCKS.PARAGRAPH,
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                />
            )

            expect(screen.getByText(paragraphText)).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render H2', () => {
            const headingText = 'Heading text'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    data: {},
                                    content: [
                                        {
                                            data: {},
                                            marks: [],
                                            value: headingText,
                                            nodeType: 'text',
                                        },
                                    ],
                                    nodeType: BLOCKS.HEADING_2,
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                />
            )

            expect(screen.getByRole('heading', { name: headingText })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render H2', () => {
            const headingText = 'Heading text'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    data: {},
                                    content: [
                                        {
                                            data: {},
                                            marks: [],
                                            value: headingText,
                                            nodeType: 'text',
                                        },
                                    ],
                                    nodeType: BLOCKS.HEADING_2,
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                />
            )

            expect(screen.getByRole('heading', { name: headingText })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render HR', () => {
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    data: {},
                                    content: [],
                                    nodeType: BLOCKS.HR,
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                />
            )

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render HomeTitle', () => {
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            nodeType: 'document',
                            data: {},
                            content: [
                                {
                                    nodeType: 'embedded-entry-block',
                                    data: {
                                        target: {
                                            sys: { id: '3uieCAj8exvxEHG0mxndMV', type: 'Link', linkType: 'Entry' },
                                        },
                                    },
                                    content: [],
                                },
                            ],
                        }),
                        references: [
                            {
                                __typename: 'ContentfulHomeTitle',
                                contentful_id: '3uieCAj8exvxEHG0mxndMV',
                            },
                        ],
                    }}
                />
            )

            // Check HomeTitle is present
            expect(screen.getByRole('heading', { name: /Lauri Lavanti/i })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render ExcerptList', () => {
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            nodeType: 'document',
                            data: {},
                            content: [
                                {
                                    nodeType: 'embedded-entry-block',
                                    data: {
                                        target: {
                                            sys: { id: '6kFlEZ2Nv6UXotMJJNIFGm', type: 'Link', linkType: 'Entry' },
                                        },
                                    },
                                    content: [],
                                },
                            ],
                        }),
                        references: [
                            {
                                __typename: 'ContentfulExcerptList',
                                contentful_id: '6kFlEZ2Nv6UXotMJJNIFGm',
                                limit: 1,
                            },
                        ],
                    }}
                />
            )

            // Check ExcerptList is present
            expect(screen.getByRole('article', { name: /Terveys kuuluu kaikille/i })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render ImageWithCaption', () => {
            const altText = 'alt'
            const caption = 'caption'

            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    data: {
                                        target: {
                                            sys: { id: '3U3GBuOeUwedsXLCVVuJ1j', type: 'Link', linkType: 'Entry' },
                                        },
                                    },
                                    content: [],
                                    nodeType: 'embedded-entry-block',
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [
                            {
                                __typename: 'ContentfulImageWithCaption',
                                contentful_id: '3U3GBuOeUwedsXLCVVuJ1j',
                                caption,
                                altText,
                                image: {
                                    localFile: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: 'constrained',
                                                placeholder: {
                                                    fallback:
                                                        'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQBAwX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABaVugzR8j/8QAGhAAAgIDAAAAAAAAAAAAAAAAAQIAEwMQEf/aAAgBAQABBQK4cd2cV5W0YJ//xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAwEBPwGI/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8Bqv/EAB0QAAECBwAAAAAAAAAAAAAAAAABAhESIDJBcZH/2gAIAQEABj8CtcZ0RSbtH//EABwQAAICAgMAAAAAAAAAAAAAAAARATEhQVFhgf/aAAgBAQABPyG5m4RKmkaoRgCdKQVK+n//2gAMAwEAAgADAAAAEEc//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxAP/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8QtT//xAAcEAACAgIDAAAAAAAAAAAAAAAAAREhMUFxgZH/2gAIAQEAAT8QSmotjexqhP1tsnpI3FJdGBm4Mw//2Q==',
                                                },
                                                images: {
                                                    fallback: {
                                                        src: '/static/cab598b604510ca253fe4f749766f06b/f7471/gesterbyn-parakit-w.jpg',
                                                        srcSet: '/static/cab598b604510ca253fe4f749766f06b/95548/gesterbyn-parakit-w.jpg 455w,\n/static/cab598b604510ca253fe4f749766f06b/e6bdc/gesterbyn-parakit-w.jpg 910w,\n/static/cab598b604510ca253fe4f749766f06b/f7471/gesterbyn-parakit-w.jpg 1820w',
                                                        sizes: '(min-width: 1820px) 1820px, 100vw',
                                                    },
                                                    sources: [
                                                        {
                                                            srcSet: '/static/cab598b604510ca253fe4f749766f06b/7bfa3/gesterbyn-parakit-w.webp 455w,\n/static/cab598b604510ca253fe4f749766f06b/d32f3/gesterbyn-parakit-w.webp 910w,\n/static/cab598b604510ca253fe4f749766f06b/9e6d8/gesterbyn-parakit-w.webp 1820w',
                                                            type: 'image/webp',
                                                            sizes: '(min-width: 1820px) 1820px, 100vw',
                                                        },
                                                    ],
                                                },
                                                width: 1820,
                                                height: 780,
                                            },
                                        },
                                    } as unknown as ImageDataLike,
                                },
                            },
                        ],
                    }}
                />
            )

            // Check ImageWithCaption is present
            expect(screen.getByRole('img', { name: altText })).toBeInTheDocument()
            expect(screen.getByRole('figure', { name: caption })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render ContactInfo', () => {
            const email = 'test@example.com'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            nodeType: 'document',
                            data: {},
                            content: [
                                {
                                    nodeType: 'embedded-entry-block',
                                    data: {
                                        target: {
                                            sys: { id: '5p1Xu3HEt01ELvRawwh6HF', type: 'Link', linkType: 'Entry' },
                                        },
                                    },
                                    content: [],
                                },
                            ],
                        }),
                        references: [
                            {
                                __typename: 'ContentfulContactInfo',
                                contentful_id: '5p1Xu3HEt01ELvRawwh6HF',
                                links: [
                                    {
                                        contentful_id: '4N9FJRjt9I5wHNGDWjp3Ox',
                                        title: email,
                                        url: null,
                                        icon: 'envelope',
                                    },
                                ],
                            },
                        ],
                    }}
                />
            )

            // Check ContactInfo is present
            expect(screen.getByText(email)).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render external links', () => {
            const uri = 'https://test.com'
            const value = 'external link'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    data: {},
                                    content: [
                                        {
                                            data: { uri },
                                            content: [
                                                {
                                                    data: {},
                                                    marks: [],
                                                    value,
                                                    nodeType: 'text',
                                                },
                                            ],
                                            nodeType: 'hyperlink',
                                        },
                                    ],
                                    nodeType: 'paragraph',
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                />
            )

            // Check external link is present
            expect(screen.getByRole('link', { name: value })).toHaveAttribute('href', uri)

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render internal links', () => {
            const slug = 'this-is-an-internal/link'
            const value = 'external link'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    data: {},
                                    content: [
                                        {
                                            data: {
                                                target: {
                                                    sys: {
                                                        id: '55DEJPnoQSfP3jJzD7jDSJ',
                                                        type: 'Link',
                                                        linkType: 'Entry',
                                                    },
                                                },
                                            },
                                            content: [
                                                {
                                                    data: {},
                                                    marks: [],
                                                    value,
                                                    nodeType: 'text',
                                                },
                                            ],
                                            nodeType: 'entry-hyperlink',
                                        },
                                    ],
                                    nodeType: 'paragraph',
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [
                            {
                                __typename: 'ContentfulPost',
                                contentful_id: '55DEJPnoQSfP3jJzD7jDSJ',
                                slug,
                            },
                        ],
                    }}
                />
            )

            // Check internal link is present
            expect(screen.getByRole('link', { name: value })).toHaveAttribute('href', `/blogi/${slug}`)

            expect(container.firstChild).toMatchSnapshot()
        })
    })
})
