import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Title from './Title.astro'

describe('<Title />', () => {
    const title = 'Test Title'
    const createdAt = '2026-01-01T00:00:00Z'

    it('should render minimal', async () => {
        const result = await renderAstroComponent(Title, {
            props: {
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render', async () => {
        const result = await renderAstroComponent(Title, {
            props: {
                allTags: { items: [{ name: 'Tekoäly', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                createdAt,
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render title', async () => {
        const result = await renderAstroComponent(Title, {
            props: {
                title,
            },
        })

        expect(getByRole(result, 'heading', { level: 1, name: title })).toBeDefined()
    })

    it('should render meta data', async () => {
        const result = await renderAstroComponent(Title, {
            props: {
                allTags: { items: [{ name: 'Tekoäly', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                createdAt,
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title,
            },
        })

        expect(getByRole(result, 'complementary', { name: `Kirjoituksen ${title} meta-tiedot` })).toBeDefined()
    })
})
