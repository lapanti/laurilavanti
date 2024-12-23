import { BLOCKS } from '@contentful/rich-text-types'
import { render, screen, waitFor } from '@testing-library/react'
import { parse } from 'date-fns'

import gatsbyConfig from '../../gatsby-config'
import { inFrontOfWoodsImage, inFrontOfWoodsImageDescription, smilingImage } from '../../tests/images.mock'
import { coopElectionsConcernUsAll, healthBelongsToAll } from '../../tests/posts.mock'
import Layout from './Layout'

interface SiteMetadata {
    title: string
    keywords: string[]
    author: string
    locale: string
    description: string
    siteUrl: string
    facebook: string
    instagram: string
    linkedIn: string
    threads: string
    bluesky: string
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
        const { container } = render(
            <Layout title="" leftAlignedTitle>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render title banner', async () => {
        const { container } = render(
            <Layout
                backgroundImage={smilingImage}
                heroImage={inFrontOfWoodsImage}
                heroImageAlt={inFrontOfWoodsImageDescription}
                leftAlignedTitle={false}
                title={title}
            >
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getAllByRole('img', { name: inFrontOfWoodsImageDescription })).not.toBeNull()

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        await waitFor(() => expect(document.title).toEqual(`${title} | ${siteTitle}`))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hero banner for front page', () => {
        const subtitle = 'Subtesxttitle'
        const { container } = render(
            <Layout
                heroImage={inFrontOfWoodsImage}
                heroImageAlt={inFrontOfWoodsImageDescription}
                subtitle={subtitle}
                title={title}
                isFrontPage
                leftAlignedTitle
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
                            content: [
                                {
                                    content: [
                                        {
                                            data: {},
                                            marks: [],
                                            nodeType: 'text',
                                            value: paragraphText,
                                        },
                                    ],
                                    data: {},
                                    nodeType: BLOCKS.PARAGRAPH,
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                    leftAlignedTitle
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
                            content: [
                                {
                                    content: [
                                        {
                                            data: {},
                                            marks: [],
                                            nodeType: 'text',
                                            value: headingText,
                                        },
                                    ],
                                    data: {},
                                    nodeType: BLOCKS.HEADING_2,
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                    leftAlignedTitle
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
                            content: [
                                {
                                    content: [],
                                    data: {},
                                    nodeType: BLOCKS.HR,
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                    leftAlignedTitle
                />
            )

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render ExcerptList', () => {
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            content: [
                                {
                                    content: [],
                                    data: {
                                        target: {
                                            sys: { id: '6kFlEZ2Nv6UXotMJJNIFGm', linkType: 'Entry', type: 'Link' },
                                        },
                                    },
                                    nodeType: 'embedded-entry-block',
                                },
                            ],
                            data: {},
                            nodeType: 'document',
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
                    leftAlignedTitle
                />
            )

            // Check ExcerptList is present
            expect(screen.getByRole('article', { name: healthBelongsToAll.title })).toBeInTheDocument()
            expect(screen.getByRole('article', { name: coopElectionsConcernUsAll.title })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render ImageWithCaption', () => {
            const description = 'alt text'
            const caption = 'caption'

            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            content: [
                                {
                                    content: [],
                                    data: {
                                        target: {
                                            sys: { id: '3U3GBuOeUwedsXLCVVuJ1j', linkType: 'Entry', type: 'Link' },
                                        },
                                    },
                                    nodeType: 'embedded-entry-block',
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [
                            {
                                __typename: 'ContentfulImageWithCaption',
                                caption,
                                contentful_id: '3U3GBuOeUwedsXLCVVuJ1j',
                                image: {
                                    description: description,
                                    gatsbyImageData: {
                                        height: 780,
                                        images: {
                                            fallback: {
                                                sizes: '(min-width: 1820px) 1820px, 100vw',
                                                src: '/static/cab598b604510ca253fe4f749766f06b/f7471/gesterbyn-parakit-w.jpg',
                                                srcSet: '/static/cab598b604510ca253fe4f749766f06b/95548/gesterbyn-parakit-w.jpg 455w,\n/static/cab598b604510ca253fe4f749766f06b/e6bdc/gesterbyn-parakit-w.jpg 910w,\n/static/cab598b604510ca253fe4f749766f06b/f7471/gesterbyn-parakit-w.jpg 1820w',
                                            },
                                            sources: [
                                                {
                                                    sizes: '(min-width: 1820px) 1820px, 100vw',
                                                    srcSet: '/static/cab598b604510ca253fe4f749766f06b/7bfa3/gesterbyn-parakit-w.webp 455w,\n/static/cab598b604510ca253fe4f749766f06b/d32f3/gesterbyn-parakit-w.webp 910w,\n/static/cab598b604510ca253fe4f749766f06b/9e6d8/gesterbyn-parakit-w.webp 1820w',
                                                    type: 'image/webp',
                                                },
                                            ],
                                        },
                                        layout: 'constrained',
                                        placeholder: {
                                            fallback:
                                                'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQBAwX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABaVugzR8j/8QAGhAAAgIDAAAAAAAAAAAAAAAAAQIAEwMQEf/aAAgBAQABBQK4cd2cV5W0YJ//xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAwEBPwGI/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8Bqv/EAB0QAAECBwAAAAAAAAAAAAAAAAABAhESIDJBcZH/2gAIAQEABj8CtcZ0RSbtH//EABwQAAICAgMAAAAAAAAAAAAAAAARATEhQVFhgf/aAAgBAQABPyG5m4RKmkaoRgCdKQVK+n//2gAMAwEAAgADAAAAEEc//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxAP/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8QtT//xAAcEAACAgIDAAAAAAAAAAAAAAAAAREhMUFxgZH/2gAIAQEAAT8QSmotjexqhP1tsnpI3FJdGBm4Mw//2Q==',
                                        },
                                        width: 1820,
                                    },
                                },
                            },
                        ],
                    }}
                    title=""
                    leftAlignedTitle
                />
            )

            // Check ImageWithCaption is present
            expect(screen.getByRole('img', { name: description })).toBeInTheDocument()
            expect(screen.getByRole('figure', { name: caption })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render embedded image', () => {
            const description = 'alt text'

            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            content: [
                                {
                                    content: [],
                                    data: {
                                        target: {
                                            sys: { id: '3U3GBuOeUwedsXLCVVuJ1j', linkType: 'Asset', type: 'Link' },
                                        },
                                    },
                                    nodeType: 'embedded-asset-block',
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [
                            {
                                __typename: 'ContentfulAsset',
                                contentful_id: '3U3GBuOeUwedsXLCVVuJ1j',
                                description,
                                gatsbyImageData: {
                                    height: 780,
                                    images: {
                                        fallback: {
                                            sizes: '(min-width: 1820px) 1820px, 100vw',
                                            src: '/static/cab598b604510ca253fe4f749766f06b/f7471/gesterbyn-parakit-w.jpg',
                                            srcSet: '/static/cab598b604510ca253fe4f749766f06b/95548/gesterbyn-parakit-w.jpg 455w,\n/static/cab598b604510ca253fe4f749766f06b/e6bdc/gesterbyn-parakit-w.jpg 910w,\n/static/cab598b604510ca253fe4f749766f06b/f7471/gesterbyn-parakit-w.jpg 1820w',
                                        },
                                        sources: [
                                            {
                                                sizes: '(min-width: 1820px) 1820px, 100vw',
                                                srcSet: '/static/cab598b604510ca253fe4f749766f06b/7bfa3/gesterbyn-parakit-w.webp 455w,\n/static/cab598b604510ca253fe4f749766f06b/d32f3/gesterbyn-parakit-w.webp 910w,\n/static/cab598b604510ca253fe4f749766f06b/9e6d8/gesterbyn-parakit-w.webp 1820w',
                                                type: 'image/webp',
                                            },
                                        ],
                                    },
                                    layout: 'constrained',
                                    placeholder: {
                                        fallback:
                                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQBAwX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABaVugzR8j/8QAGhAAAgIDAAAAAAAAAAAAAAAAAQIAEwMQEf/aAAgBAQABBQK4cd2cV5W0YJ//xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAwEBPwGI/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8Bqv/EAB0QAAECBwAAAAAAAAAAAAAAAAABAhESIDJBcZH/2gAIAQEABj8CtcZ0RSbtH//EABwQAAICAgMAAAAAAAAAAAAAAAARATEhQVFhgf/aAAgBAQABPyG5m4RKmkaoRgCdKQVK+n//2gAMAwEAAgADAAAAEEc//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxAP/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8QtT//xAAcEAACAgIDAAAAAAAAAAAAAAAAAREhMUFxgZH/2gAIAQEAAT8QSmotjexqhP1tsnpI3FJdGBm4Mw//2Q==',
                                    },
                                    width: 1820,
                                },
                            },
                        ],
                    }}
                    title=""
                    leftAlignedTitle
                />
            )

            // Check image is present
            expect(screen.getByRole('img', { name: description })).toBeInTheDocument()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render nothing when embedded asset has no image', () => {
            const description = 'alt text'

            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            content: [
                                {
                                    content: [],
                                    data: {
                                        target: {
                                            sys: { id: '3U3GBuOeUwedsXLCVVuJ1j', linkType: 'Asset', type: 'Link' },
                                        },
                                    },
                                    nodeType: 'embedded-asset-block',
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [
                            {
                                __typename: 'ContentfulAsset',
                                contentful_id: '3U3GBuOeUwedsXLCVVuJ1j',
                                description,
                            },
                        ],
                    }}
                    title=""
                    leftAlignedTitle
                />
            )

            // Check image is not present
            expect(screen.queryByRole('img', { name: description })).toBeNull()

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render ContactInfoLink', () => {
            const title = 'Facebook'
            const url = `https://www.facebook.com/laurilavanti`
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            content: [
                                {
                                    content: [],
                                    data: {
                                        target: {
                                            sys: { id: '5p1Xu3HEt01ELvRawwh6HF', linkType: 'Entry', type: 'Link' },
                                        },
                                    },
                                    nodeType: 'embedded-inline-block',
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [
                            {
                                __typename: 'ContentfulContactInfoLink',
                                contentful_id: '4N9FJRjt9I5wHNGDWjp3Ox',
                                icon: 'envelope',
                                title,
                                url,
                            },
                        ],
                    }}
                    title=""
                    leftAlignedTitle
                />
            )

            // Check ContactInfoLink is present
            expect(screen.getByRole('link', { name: title })).toHaveAttribute('href', url)

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render external links', () => {
            const uri = 'https://test.com'
            const value = 'external link'
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            content: [
                                {
                                    content: [
                                        {
                                            content: [
                                                {
                                                    data: {},
                                                    marks: [],
                                                    nodeType: 'text',
                                                    value,
                                                },
                                            ],
                                            data: { uri },
                                            nodeType: 'hyperlink',
                                        },
                                    ],
                                    data: {},
                                    nodeType: 'paragraph',
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                    leftAlignedTitle
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
                            content: [
                                {
                                    content: [
                                        {
                                            content: [
                                                {
                                                    data: {},
                                                    marks: [],
                                                    nodeType: 'text',
                                                    value,
                                                },
                                            ],
                                            data: {
                                                target: {
                                                    sys: {
                                                        id: '55DEJPnoQSfP3jJzD7jDSJ',
                                                        linkType: 'Entry',
                                                        type: 'Link',
                                                    },
                                                },
                                            },
                                            nodeType: 'entry-hyperlink',
                                        },
                                    ],
                                    data: {},
                                    nodeType: 'paragraph',
                                },
                            ],
                            data: {},
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
                    leftAlignedTitle
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
                            content: [
                                {
                                    content: [
                                        {
                                            content: [
                                                {
                                                    content: [
                                                        {
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    marks: [],
                                                                    nodeType: 'text',
                                                                    value: header,
                                                                },
                                                            ],
                                                            data: {},
                                                            nodeType: 'paragraph',
                                                        },
                                                    ],
                                                    data: {},
                                                    nodeType: 'table-header-cell',
                                                },
                                            ],
                                            data: {},
                                            nodeType: 'table-row',
                                        },
                                        {
                                            content: [
                                                {
                                                    content: [
                                                        {
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    marks: [],
                                                                    nodeType: 'text',
                                                                    value: cell,
                                                                },
                                                            ],
                                                            data: {},
                                                            nodeType: 'paragraph',
                                                        },
                                                    ],
                                                    data: {},
                                                    nodeType: 'table-cell',
                                                },
                                            ],
                                            data: {},
                                            nodeType: 'table-row',
                                        },
                                    ],
                                    data: {},
                                    nodeType: 'table',
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                    leftAlignedTitle
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
                    content: [
                        {
                            data: {},
                            marks: [],
                            nodeType: 'text',
                            value: quoteText,
                        },
                    ],
                    data: {},
                    nodeType: BLOCKS.PARAGRAPH,
                },
                true,
            ],
            [
                'not render a BlockQuote if it has wrong children',
                {
                    data: {},
                    marks: [],
                    nodeType: 'text',
                    value: quoteText,
                },
                false,
            ],
        ])('should %s', (_, firstContent, isVisible) => {
            const { container } = render(
                <Layout
                    body={{
                        raw: JSON.stringify({
                            content: [
                                {
                                    content: [firstContent],
                                    data: {},
                                    nodeType: BLOCKS.QUOTE,
                                },
                            ],
                            data: {},
                            nodeType: 'document',
                        }),
                        references: [],
                    }}
                    title=""
                    leftAlignedTitle
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
                            content: [
                                {
                                    content: [
                                        {
                                            content: [],
                                            data: {
                                                target: {
                                                    sys: {
                                                        id: 'fvxZI2eLzqnwfebd6CPUO',
                                                        linkType: 'Entry',
                                                        type: 'Link',
                                                    },
                                                },
                                            },
                                            nodeType: 'embedded-entry-inline',
                                        },
                                    ],
                                    data: {},
                                    nodeType: 'paragraph',
                                },
                            ],
                            data: {},
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
                    leftAlignedTitle
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
