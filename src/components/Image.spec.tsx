import type { ImageDataLike } from 'gatsby-plugin-image'

import { render, screen } from '@testing-library/react'
import React from 'react'

import { mainImage } from '../../tests/images.mock'
import Image from './Image'

describe('<Image />', () => {
    const alt = 'alt'

    it('should return null if no image data', () => {
        const imageData: ImageDataLike = {
            id: '',
            parent: null,
            children: [],
            internal: { type: '', contentDigest: '', owner: '' },
        }
        const { container } = render(<Image imageData={imageData} alt={alt} />)

        expect(container.firstChild).toBeNull()
    })

    it('should render image', () => {
        const { container } = render(<Image imageData={mainImage} alt={alt} />)

        expect(screen.getByRole('img', { name: alt })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render image with caption', () => {
        const caption = 'My caption'

        const { container } = render(<Image imageData={mainImage} caption={caption} alt={alt} />)

        expect(screen.getByRole('img', { name: alt })).toBeInTheDocument()
        expect(screen.getByRole('figure', { name: caption })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render image with caption link', () => {
        const link = 'http://laurilavanti.fi'
        const caption = 'My caption'

        const { container } = render(<Image link={link} imageData={mainImage} caption={caption} alt={alt} />)

        expect(screen.getByRole('img', { name: alt })).toBeInTheDocument()
        expect(screen.getByRole('figure', { name: caption })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: caption })).toHaveAttribute('href', link)

        expect(container.firstChild).toMatchSnapshot()
    })
})
