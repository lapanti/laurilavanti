import { render, screen } from '@testing-library/react'
import React from 'react'

import { mainImage } from '../../../tests/images.mock'
import HeroBanner from './HeroBanner'

describe('<HeroBanner />', () => {
    const title = 'Test Title'
    const subtitle = 'Sub test sub title'
    const secondaryTitle = 'Secondary test secondary title'

    it('should render minimal', () => {
        const { container } = render(<HeroBanner title={title} />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render maximal', () => {
        const { container } = render(
            <HeroBanner title={title} subtitle={subtitle} secondaryTitle={secondaryTitle} backgroundImage={mainImage} />
        )

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: subtitle })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: secondaryTitle })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
