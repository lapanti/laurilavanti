import { render, screen } from '@testing-library/react'

import { inFrontOfWoodsImage } from '../../../tests/images.mock'
import Excerpt from './Excerpt'

describe('<Excerpt />', () => {
    const title = 'Terveys kuuluu kaikille'
    const date = '19.01.2022'
    const excerpt =
        'Poistamalla sosiaali- ja terveydenhuollon asiakasmaksut, säästämme byrokratiassa. Lisäksi pääsemme hoitamaan ongelmia ennen kuin niistä tulee merkittäviä. Ja tärkeimpänä varmistamme, ettei kukaan jää ilman hoitoa taloudellisista syistä.'
    const tags = ['aluevaalit', 'soteuudistus', 'kirkkonummi']
    const slug = 'sote-on-hyvinvointiyhteiskunnan-kulmakivi'
    const imageAlt = 'imageAlt'

    const renderHelper = () =>
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
        expect(mainLink).toHaveAttribute('href', `/blogi/${slug}/`)
        expect(mainLink).toHaveAttribute('rel', 'permalink')
    })

    it('should render all tags', () => {
        renderHelper()

        tags.forEach((tag) => {
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/kategoria/${tag}/`)
        })
    })

    it('should render date', () => {
        renderHelper()

        expect(screen.getByText(date)).toBeInTheDocument()
    })

    it('should render description text', () => {
        renderHelper()

        expect(screen.getByText(excerpt)).toHaveAttribute('itemProp', 'description')
    })
})
