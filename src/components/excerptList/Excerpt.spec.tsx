import { render, screen } from '@testing-library/react'
import React from 'react'

import { mainImage } from '../../../tests/images.mock'
import Excerpt from './Excerpt'

describe('<Excerpt />', () => {
    it('should render', () => {
        const title = 'Terveys kuuluu kaikille'
        const date = '19.01.2022'
        const excerpt =
            'Poistamalla sosiaali- ja terveydenhuollon asiakasmaksut, säästämme byrokratiassa. Lisäksi pääsemme hoitamaan ongelmia ennen kuin niistä tulee merkittäviä. Ja tärkeimpänä varmistamme, ettei kukaan jää ilman hoitoa taloudellisista syistä.'
        const tags = ['aluevaalit', 'soteuudistus', 'kirkkonummi']
        const readingTime = 65700
        const slug = 'blogi/2021/12/20/sote-on-hyvinvointiyhteiskunnan-kulmakivi'

        const { container } = render(
            <Excerpt
                title={title}
                date={date}
                excerpt={excerpt}
                tags={tags}
                readingTime={readingTime}
                slug={slug}
                image={mainImage}
            />
        )

        const article = screen.getByRole('article', { name: title })
        expect(article).toHaveAttribute('itemScope', '')
        expect(article).toHaveAttribute('itemType', 'https://schema.org/CreativeWork')

        expect(screen.getByRole('heading', { name: title })).toHaveAttribute('itemProp', 'headline')

        const mainLink = screen.getByRole('link', { name: new RegExp(title, 'i') })
        expect(mainLink).toHaveAttribute('href', `/${slug}`)
        expect(mainLink).toHaveAttribute('rel', 'permalink')

        tags.forEach((tag) => {
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        })

        expect(screen.getByText(date)).toBeInTheDocument()
        expect(screen.getByText('noin 1 minuutti')).toBeInTheDocument()
        expect(screen.getByText(excerpt)).toHaveAttribute('itemProp', 'description')

        expect(container.firstChild).toMatchSnapshot()
    })
})
