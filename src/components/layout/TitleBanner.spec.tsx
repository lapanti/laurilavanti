import { render, screen } from '@testing-library/react'
import React from 'react'

import { inFrontOfWoodsImage, inFrontOfWoodsImageDescription, smilingImage } from '../../../tests/images.mock'
import TitleBanner from './TitleBanner'

describe('<TitleBanner />', () => {
    const title = 'Banner title'
    const publishDate = '4.10.2024'
    const tags = ['kirkkonummi', 'kuntavaalit']

    it('should render minimal', () => {
        const { container } = render(<TitleBanner title={title} leftAlignedTitle />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render image without alt', () => {
        const { container } = render(
            <TitleBanner
                backgroundImage={smilingImage}
                imageData={inFrontOfWoodsImage}
                leftAlignedTitle={false}
                title={title}
            />
        )

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        // When no alt, image has role "presentation" and the background image is already there, so should find 2 pieces
        expect(screen.getAllByRole('presentation')).toHaveLength(2)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should not render meta, even if present', () => {
        const { container } = render(
            <TitleBanner
                imageAlt={inFrontOfWoodsImageDescription}
                imageData={inFrontOfWoodsImage}
                publishDate={publishDate}
                tags={tags}
                title={title}
                leftAlignedTitle
            />
        )

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.getByRole('img', { name: inFrontOfWoodsImageDescription })).toBeInTheDocument()

        expect(screen.queryByText(publishDate)).toBeNull()
        tags.forEach((tag) => expect(screen.queryByRole('link', { name: `#${tag}` })).toBeNull())

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should "render" meta', () => {
        const { container } = render(
            <TitleBanner
                imageAlt={inFrontOfWoodsImageDescription}
                imageData={inFrontOfWoodsImage}
                title={title}
                leftAlignedTitle
                showMeta
            />
        )

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.getByRole('img', { name: inFrontOfWoodsImageDescription })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render meta', () => {
        const { container } = render(
            <TitleBanner
                imageAlt={inFrontOfWoodsImageDescription}
                imageData={inFrontOfWoodsImage}
                publishDate={publishDate}
                tags={tags}
                title={title}
                leftAlignedTitle
                showMeta
            />
        )

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.getByRole('img', { name: inFrontOfWoodsImageDescription })).toBeInTheDocument()

        expect(screen.getByText(publishDate)).toBeInTheDocument()
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/kategoria/${tag}/`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
