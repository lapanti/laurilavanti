import { render, screen } from '@testing-library/react'
import React from 'react'

import { aboutMe, blog, contactMe } from '../../tests/pages.mock'
import Page from './Page'

describe('<Page />', () => {
    it('should render about me page', () => {
        const { container } = render(<Page data={{ contentfulPage: aboutMe }} pageContext={{ slug: 'minusta' }} />)

        expect(screen.getByRole('heading', { name: aboutMe.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })

    it('should render blog page', () => {
        const { container } = render(<Page data={{ contentfulPage: blog }} pageContext={{ slug: 'blogi' }} />)

        expect(screen.getByRole('heading', { name: blog.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })

    it('should render contact me page', () => {
        const { container } = render(
            <Page data={{ contentfulPage: contactMe }} pageContext={{ slug: 'ota-yhteytta' }} />
        )

        expect(screen.getByRole('heading', { name: contactMe.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })
})
