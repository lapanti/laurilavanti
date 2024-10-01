import { render, screen } from '@testing-library/react'
import React from 'react'

import { inFrontOfWoodsImage, inFrontOfWoodsImageDescription } from '../../../tests/images.mock'
import HeroBanner from './HeroBanner'

describe('<HeroBanner />', () => {
    const title = 'Test Title'
    const subtitle = 'Sub test sub title'
    const secondaryTitle = 'Secondary test secondary title'

    it('should render minimal', () => {
        const { container } = render(<HeroBanner title={title} />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.queryByRole('img')).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render minimal with borken image data', () => {
        const { container } = render(<HeroBanner imageData={{ key: undefined }} title={title} />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.queryByRole('img')).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render minimal with image with no image alt', () => {
        const { container } = render(<HeroBanner imageData={inFrontOfWoodsImage} title={title} />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        // When gatsby image has no alt, it has aria-role presentation
        expect(screen.getByRole('presentation', { name: '' })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render maximal', () => {
        const { container } = render(
            <HeroBanner
                backgroundImage={inFrontOfWoodsImage}
                imageAlt={inFrontOfWoodsImageDescription}
                imageData={inFrontOfWoodsImage}
                secondaryTitle={secondaryTitle}
                subtitle={subtitle}
                title={title}
            />
        )

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.getByText(subtitle)).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: secondaryTitle })).toBeInTheDocument()
        expect(screen.getByRole('img', { name: inFrontOfWoodsImageDescription })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
