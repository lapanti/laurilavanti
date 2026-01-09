import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Body from './Body.astro'

vi.mock(import('contentful'), () => ({
    createClient: vi.fn().mockReturnValue({ getEntries: vi.fn().mockResolvedValue({ items: [] }) }),
}))

describe('<Body />', () => {
    it('should render nothing if no nodes', async () => {
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: { content: [] },
            },
        })

        expect(result.firstChild).toBeNull()
    })

    it('should render text when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            marks: [],
                            nodeType: 'text',
                            value,
                        },
                    ],
                },
            },
        })

        expect(getByText(result, value)).toBeDefined()
    })

    it('should render italic text when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            marks: [{ type: MARKS.ITALIC }],
                            nodeType: 'text',
                            value,
                        },
                    ],
                },
            },
        })

        expect(getByText(result, value)).toMatchInlineSnapshot(`
          <i>
            Hello, world!
          </i>
        `)
    })

    it('should render paragraph when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    marks: [],
                                    nodeType: 'text',
                                    value,
                                },
                            ],
                            nodeType: BLOCKS.PARAGRAPH,
                        },
                    ],
                },
            },
        })

        expect(result).toMatchInlineSnapshot(`
          <div>
            <p
              data-astro-cid-ho6gvodc=""
              style="grid-column-start:3;--bodyFontSize: 1.125rem;--bodyFontWeight: 400;--bodyLineHeight: 1.75rem;--marginBottom: 1rem;--marginTop: 1rem;"
            >
               Hello, world! 
            </p>
          </div>
        `)
    })

    it('should render H2 when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    marks: [],
                                    nodeType: 'text',
                                    value,
                                },
                            ],
                            nodeType: BLOCKS.HEADING_2,
                        },
                    ],
                },
            },
        })

        expect(getByRole(result, 'heading', { level: 2, name: value })).toBeDefined()
    })

    it('should render H3 when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    marks: [],
                                    nodeType: 'text',
                                    value,
                                },
                            ],
                            nodeType: BLOCKS.HEADING_3,
                        },
                    ],
                },
            },
        })

        expect(getByRole(result, 'heading', { level: 3, name: value })).toBeDefined()
    })

    it('should render UL when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    marks: [],
                                    nodeType: 'text',
                                    value,
                                },
                            ],
                            nodeType: BLOCKS.UL_LIST,
                        },
                    ],
                },
            },
        })

        expect(getByRole(result, 'list')).toBeDefined()
    })

    it('should render LI when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    marks: [],
                                    nodeType: 'text',
                                    value,
                                },
                            ],
                            nodeType: BLOCKS.LIST_ITEM,
                        },
                    ],
                },
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })

    it('should render HR when provided', async () => {
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [],
                            nodeType: BLOCKS.HR,
                        },
                    ],
                },
            },
        })

        expect(getByRole(result, 'separator')).toBeDefined()
    })

    it('should render blockquote when provided', async () => {
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    content: [
                                        {
                                            marks: [],
                                            nodeType: 'text',
                                            value,
                                        },
                                    ],
                                    marks: [],
                                    nodeType: 'text',
                                    value: '',
                                },
                            ],
                            nodeType: BLOCKS.QUOTE,
                        },
                    ],
                },
            },
        })

        expect(getByRole(result, 'blockquote')).toHaveTextContent(value)
    })

    it('should render external link when provided', async () => {
        const uri = 'https://bsky.app'
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    marks: [],
                                    nodeType: 'text',
                                    value,
                                },
                            ],
                            data: {
                                uri,
                            },
                            nodeType: INLINES.HYPERLINK,
                        },
                    ],
                },
            },
        })

        const link = getByRole(result, 'link', { name: value })
        expect(link).toHaveAttribute('href', uri)
        expect(link).toHaveAttribute('target', '_blank')
    })

    it('should render blog link when provided', async () => {
        const slug = 'tekoalysta'
        const value = 'Hello, world!'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [
                                {
                                    marks: [],
                                    nodeType: 'text',
                                    value,
                                },
                            ],
                            data: {
                                target: {
                                    fields: {
                                        slug,
                                    },
                                    sys: {
                                        contentType: {
                                            sys: {
                                                id: 'post',
                                            },
                                        },
                                    },
                                },
                            },
                            nodeType: INLINES.ENTRY_HYPERLINK,
                        },
                    ],
                },
            },
        })

        const link = getByRole(result, 'link', { name: value })
        expect(link).toHaveAttribute('href', `/blogi/${slug}/`)
        expect(link).not.toHaveAttribute('target', '_blank')
    })

    it('should render embedded CV when provided', async () => {
        const degreesTitle = 'Tutkinnot'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [],
                            data: {
                                target: {
                                    fields: {
                                        degrees: [],
                                        degreesTitle,
                                        fiduciaries: [],
                                        fiduciariesTitle: '',
                                        jobExperiences: [],
                                        jobExperiencesTitle: '',
                                    },
                                    sys: {
                                        contentType: {
                                            sys: {
                                                id: 'curriculumVitae',
                                            },
                                        },
                                    },
                                },
                            },
                            nodeType: BLOCKS.EMBEDDED_ENTRY,
                        },
                    ],
                },
            },
        })

        expect(getByText(result, degreesTitle)).toBeDefined()
    })

    it('should render excerptlist when provided', async () => {
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [],
                            data: {
                                target: {
                                    fields: {
                                        limit: 0,
                                    },
                                    sys: {
                                        contentType: {
                                            sys: {
                                                id: 'excerptList',
                                            },
                                        },
                                    },
                                },
                            },
                            nodeType: BLOCKS.EMBEDDED_ENTRY,
                        },
                    ],
                },
            },
        })

        expect(result.firstChild).toMatchInlineSnapshot(`
          <ul
            data-astro-cid-zweomfls=""
            style="--sizes2: 2rem;--sizes3point5: 3.5rem;--sizes4: 4rem;--sizes35: 35rem;"
          >
              
          </ul>
        `)
    })

    it('should render image with caption when provided', async () => {
        const caption = 'Test caption'

        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            content: [],
                            data: {
                                target: {
                                    fields: {
                                        caption,
                                        image: {
                                            fields: {
                                                description: 'Test image description',
                                                file: {
                                                    url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                                                },
                                            },
                                        },
                                    },
                                    sys: {
                                        contentType: {
                                            sys: {
                                                id: 'imageWithCaption',
                                            },
                                        },
                                    },
                                },
                            },
                            nodeType: BLOCKS.EMBEDDED_ENTRY,
                        },
                    ],
                },
            },
        })

        expect(getByRole(result, 'figure', { name: caption })).toBeDefined()
    })

    it('should render contact info link when provided', async () => {
        const url = 'https://mastodontti.fi/laurilavanti'
        const username = '@laurilavanti@mastodontti.fi'
        const result = await renderAstroComponent(Body, {
            props: {
                allTags: { items: [] },
                node: {
                    content: [
                        {
                            data: {
                                target: {
                                    fields: {
                                        url,
                                        username,
                                    },
                                    sys: {
                                        contentType: {
                                            sys: {
                                                id: 'contactInfoLink',
                                            },
                                        },
                                    },
                                },
                            },
                            nodeType: INLINES.EMBEDDED_ENTRY,
                        },
                    ],
                },
            },
        })

        const link = getByRole(result, 'link', { name: username })
        expect(link).toHaveAttribute('href', url)
        expect(link).toHaveAttribute('target', '_blank')
    })
})
