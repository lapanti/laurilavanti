import { getAllByRole, getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import { tags } from '../content/tags'
import TopicsList from './TopicsList.astro'

const testIds = ['artificial-intelligence', 'technology']
const aiTag = tags.find((t) => t.id === 'artificial-intelligence')!
const techTag = tags.find((t) => t.id === 'technology')!

describe('TopicsList', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'fi' },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('renders links with correct fi href', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'fi' },
        })

        const links = getAllByRole(result, 'link')
        expect(links).toHaveLength(testIds.length)
        expect(links[0]).toHaveAttribute('href', '/fi/category/artificial-intelligence/')
        expect(links[1]).toHaveAttribute('href', '/fi/category/technology/')
    })

    it('renders links with correct en href', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'en' },
        })

        const links = getAllByRole(result, 'link')
        expect(links[0]).toHaveAttribute('href', '/en/category/artificial-intelligence/')
        expect(links[1]).toHaveAttribute('href', '/en/category/technology/')
    })

    it('renders links with correct sv href', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'sv' },
        })

        const links = getAllByRole(result, 'link')
        expect(links[0]).toHaveAttribute('href', '/sv/category/artificial-intelligence/')
        expect(links[1]).toHaveAttribute('href', '/sv/category/technology/')
    })

    it('renders tag names in fi', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'fi' },
        })

        expect(getByRole(result, 'heading', { name: aiTag.names.fi })).toBeDefined()
        expect(getByRole(result, 'heading', { name: techTag.names.fi })).toBeDefined()
    })

    it('renders tag names in en', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'en' },
        })

        expect(getByRole(result, 'heading', { name: aiTag.names.en })).toBeDefined()
        expect(getByRole(result, 'heading', { name: techTag.names.en })).toBeDefined()
    })

    it('renders tag names in sv', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'sv' },
        })

        expect(getByRole(result, 'heading', { name: aiTag.names.sv })).toBeDefined()
        expect(getByRole(result, 'heading', { name: techTag.names.sv })).toBeDefined()
    })

    it('renders metaDescriptions', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: testIds, lang: 'fi' },
        })

        expect(getByText(result, aiTag.metaDescription.fi)).toBeDefined()
        expect(getByText(result, techTag.metaDescription.fi)).toBeDefined()
    })

    it('skips unknown IDs without crashing', async () => {
        const result = await renderAstroComponent(TopicsList, {
            props: { ids: ['unknown-id', 'artificial-intelligence'], lang: 'fi' },
        })

        const links = getAllByRole(result, 'link')
        expect(links).toHaveLength(1)
        expect(links[0]).toHaveAttribute('href', '/fi/category/artificial-intelligence/')
    })
})
