import type { ImageDataLike } from 'gatsby-plugin-image'

import { BLOCKS } from '@contentful/rich-text-types'
import { render, screen, waitFor } from '@testing-library/react'
import { parse } from 'date-fns'
import React from 'react'

import gatsbyConfig from '../../gatsby-config'
import { inFrontOfWoodsImage, inFrontOfWoodsImageDescription } from '../../tests/images.mock'
import { coopElectionsConcernUsAll, healthBelongsToAll } from '../../tests/posts.mock'
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
    instagram: string
    linkedIn: string
    mastodon: string
}

describe('<Layout />', () => {
    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(parse('2020-01-01', 'yyyy-MM-dd', new Date()))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    const title = 'Title'
    const children = 'Children'
    const { title: siteTitle } = gatsbyConfig.siteMetadata as unknown as SiteMetadata

    it('should render minimal', () => {
        const { container } = render(<Layout title="">{children}</Layout>)

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

    it('should render hero image', () => {
        const { container } = render(
            <Layout heroImage={inFrontOfWoodsImage} heroImageAlt={inFrontOfWoodsImageDescription} title={title}>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getAllByRole('img', { name: inFrontOfWoodsImageDescription })).not.toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hero image with no alt', () => {
        const { container } = render(
            <Layout heroImage={inFrontOfWoodsImage} title="">
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('presentation', { name: '' })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hero banner for front page', () => {
        const subtitle = 'Subtesxttitle'
        const { container } = render(
            <Layout
                heroImage={inFrontOfWoodsImage}
                heroImageAlt={inFrontOfWoodsImageDescription}
                isFrontPage
                subtitle={subtitle}
                title={title}
            >
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.getByText(subtitle)).toBeInTheDocument()

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
                    title=""
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
                    title=""
                />
            )

            expect(screen.getByRole('heading', { name: headingText })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render Hr', () => {
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
                    title=""
                />
            )

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
                                pinned: [{ slug: healthBelongsToAll.slug }],
                            },
                        ],
                    }}
                    title=""
                />
            )

            // Check ExcerptList is present
            expect(screen.getByRole('article', { name: healthBelongsToAll.title })).toBeInTheDocument()
            expect(screen.getByRole('article', { name: coopElectionsConcernUsAll.title })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render ImageWithCaption', () => {
            const altText = 'alt text'
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
                                altText: 'alt',
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
                                    description: altText,
                                },
                            },
                        ],
                    }}
                    title=""
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
                    title=""
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
                    title=""
                />
            )

            // Check external link is present
            expect(screen.getByRole('link', { name: value })).toHaveAttribute('href', uri)

            expect(container.firstChild).toMatchSnapshot()
        })

        it.each([
            [' ', 'ContentfulPost', true],
            [' borken ', 'This will never match', false],
        ])('should render%sinternal links', (_, __typename, isVisible) => {
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
                                __typename,
                                contentful_id: '55DEJPnoQSfP3jJzD7jDSJ',
                                slug,
                            },
                        ],
                    }}
                    title=""
                />
            )

            if (isVisible) {
                // Check internal link is present
                expect(screen.getByRole('link', { name: value })).toHaveAttribute('href', `/blogi/${slug}/`)
            } else {
                expect(screen.queryByRole('link', { name: value })).toBeNull()
            }

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render table', () => {
            const header = 'my table header'
            const cell = 'my table cell'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    nodeType: 'table',
                                    data: {},
                                    content: [
                                        {
                                            nodeType: 'table-row',
                                            data: {},
                                            content: [
                                                {
                                                    nodeType: 'table-header-cell',
                                                    data: {},
                                                    content: [
                                                        {
                                                            nodeType: 'paragraph',
                                                            data: {},
                                                            content: [
                                                                {
                                                                    nodeType: 'text',
                                                                    value: header,
                                                                    marks: [],
                                                                    data: {},
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            nodeType: 'table-row',
                                            data: {},
                                            content: [
                                                {
                                                    nodeType: 'table-cell',
                                                    data: {},
                                                    content: [
                                                        {
                                                            nodeType: 'paragraph',
                                                            data: {},
                                                            content: [
                                                                {
                                                                    nodeType: 'text',
                                                                    value: cell,
                                                                    marks: [],
                                                                    data: {},
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                />
            )

            // Check table parts are present
            expect(screen.getByRole('columnheader', { name: header })).toHaveTextContent(header)
            expect(screen.getByRole('cell', { name: cell })).toHaveTextContent(cell)

            expect(container.firstChild).toMatchSnapshot()
        })

        const quoteText = 'Quote text'

        it.each([
            [
                'render BlockQuote',
                {
                    nodeType: BLOCKS.PARAGRAPH,
                    data: {},
                    content: [
                        {
                            nodeType: 'text',
                            value: quoteText,
                            marks: [],
                            data: {},
                        },
                    ],
                },
                true,
            ],
            [
                'not render a BlockQuote if it has wrong children',
                {
                    nodeType: 'text',
                    value: quoteText,
                    marks: [],
                    data: {},
                },
                false,
            ],
        ])('should %s', (_, firstContent, isVisible) => {
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            data: {},
                            content: [
                                {
                                    nodeType: BLOCKS.QUOTE,
                                    data: {},
                                    content: [firstContent],
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                />
            )

            if (isVisible) {
                expect(screen.getByText(quoteText)).toBeInTheDocument()
            } else {
                expect(screen.queryByText(quoteText)).toBeNull()
            }

            expect(container.firstChild).toMatchSnapshot()
        })

        it.each([
            ['YearsFrom', 'ContentfulYearsFrom', '20'],
            ['borken stuff', 'Never Going to Match Anything', null],
        ])('should render inline %s', (_, __typename, expected) => {
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
                                                        id: 'fvxZI2eLzqnwfebd6CPUO',
                                                        type: 'Link',
                                                        linkType: 'Entry',
                                                    },
                                                },
                                            },
                                            content: [],
                                            nodeType: 'embedded-entry-inline',
                                        },
                                    ],
                                    nodeType: 'paragraph',
                                },
                            ],
                            nodeType: 'document',
                        }),
                        references: [
                            {
                                __typename,
                                contentful_id: 'fvxZI2eLzqnwfebd6CPUO',
                                dateToCountFrom: '2000-01-01',
                            },
                        ],
                    }}
                    title=""
                />
            )

            if (expected) {
                // Check YearsFrom is present
                expect(screen.getByText(expected)).toBeInTheDocument()
            }

            expect(container.firstChild).toMatchSnapshot()
        })
    })
})
