import type { Tag } from '../../types/contentful'

import { render, screen } from '@testing-library/react'

import { inFrontOfWoodsImage } from '../../../tests/images.mock'
import Excerpt from './Excerpt'

describe('<Excerpt />', () => {
    const title = 'Terveys kuuluu kaikille'
    const defaultDate = '19.01.2022'
    const excerpt =
        'Poistamalla sosiaali- ja terveydenhuollon asiakasmaksut, säästämme byrokratiassa. Lisäksi pääsemme hoitamaan ongelmia ennen kuin niistä tulee merkittäviä. Ja tärkeimpänä varmistamme, ettei kukaan jää ilman hoitoa taloudellisista syistä.'
    const defaultTags = [
        { contentful_id: 'aluevaalit', name: 'aluevaalit' },
        { contentful_id: 'soteuudistus', name: 'soteuudistus' },
        { contentful_id: 'kirkkonummi', name: 'Kirkkonummi' },
    ]
    const slug = 'sote-on-hyvinvointiyhteiskunnan-kulmakivi'
    const imageAlt = 'imageAlt'

    const renderHelper = ({ date, tags }: { date?: string; tags?: Tag[] } = { date: defaultDate, tags: defaultTags }) =>
        render(
            <Excerpt
                date={date}
                excerpt={excerpt}
                image={inFrontOfWoodsImage}
                imageAlt={imageAlt}
                slug={slug}
                tags={tags}
                title={title}
            />
        )

    it('should render', () => {
        const { container } = renderHelper()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render article container', () => {
        renderHelper()

        const article = screen.getByRole('article', { name: title })
        expect(article).toHaveAttribute('itemScope', '')
        expect(article).toHaveAttribute('itemType', 'https://schema.org/CreativeWork')
    })

    it('should render image', () => {
        renderHelper()

        expect(screen.getByRole('img', { name: imageAlt })).toBeInTheDocument()
    })

    it('should render title', () => {
        renderHelper()

        expect(screen.getByRole('heading', { name: title })).toHaveAttribute('itemProp', 'headline')
    })

    it('should render link', () => {
        renderHelper()

        const mainLink = screen.getByRole('link', { name: new RegExp(title, 'i') })
        expect(mainLink).toHaveAttribute('href', `/${slug}/`)
        expect(mainLink).toHaveAttribute('rel', 'permalink')
    })

    it('should render all tags', () => {
        renderHelper()

        defaultTags.forEach((tag) => {
            expect(screen.getByRole('link', { name: `#${tag.name}` })).toHaveAttribute(
                'href',
                `/kategoria/${tag.contentful_id}/`
            )
        })
    })

    it('should render date', () => {
        renderHelper()

        expect(screen.getByText(defaultDate)).toBeInTheDocument()
    })

    it('should not render meta if no tags', () => {
        renderHelper({ date: defaultDate })

        expect(screen.queryByText(defaultDate)).toBeNull()
    })

    it('should not render meta if no date', () => {
        renderHelper({ tags: defaultTags })

        defaultTags.forEach((tag) => {
            expect(screen.queryByRole('link', { name: `#${tag.name}` })).toBeNull()
        })
    })

    it('should render description text', () => {
        renderHelper()

        expect(screen.getByText(excerpt)).toHaveAttribute('itemProp', 'description')
    })
})
