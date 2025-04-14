import type { IGatsbyImageData } from 'gatsby-plugin-image'
import type { ComponentProps } from 'react'

import { render, screen } from '@testing-library/react'

import { inFrontOfWoodsImage, inFrontOfWoodsImageDescription } from '../../../tests/images.mock'
import HeroBanner from './HeroBanner'

describe('<HeroBanner />', () => {
    const mockTitle = 'Test Title'
    const mockSecondaryTitle = 'Secondary test secondary title'

    const renderHelper = ({
        backgroundImage,
        imageAlt,
        imageData,
        secondaryTitle,
        title,
    }: Partial<ComponentProps<typeof HeroBanner>> = {}) =>
        render(
            <HeroBanner
                backgroundImage={backgroundImage}
                imageAlt={imageAlt}
                imageData={imageData}
                secondaryTitle={secondaryTitle}
                title={title ?? mockTitle}
            />
        )

    it('should render minimal', () => {
        const { container } = renderHelper()

        expect(screen.queryByRole('img')).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render minimal with borken image data', () => {
        renderHelper({ imageData: { key: undefined } as unknown as IGatsbyImageData })

        expect(screen.queryByRole('img')).toBeNull()
    })

    it('should render minimal with image with no image alt', () => {
        renderHelper({ imageData: inFrontOfWoodsImage })

        // When gatsby image has no alt, it has aria-role presentation
        expect(screen.getByRole('presentation', { name: '' })).toBeInTheDocument()
    })

    it('should render', () => {
        const { container } = renderHelper({
            backgroundImage: inFrontOfWoodsImage,
            imageAlt: inFrontOfWoodsImageDescription,
            imageData: inFrontOfWoodsImage,
            secondaryTitle: mockSecondaryTitle,
            title: mockTitle,
        })

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render title', () => {
        const title = 'A title for testing purposes'
        renderHelper({ title })

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    })

    it('should render secondaryTitle', () => {
        const secondaryTitle = 'A secondary title for testing purposes'
        renderHelper({ secondaryTitle })

        expect(screen.getByRole('heading', { name: secondaryTitle })).toBeInTheDocument()
    })
})
