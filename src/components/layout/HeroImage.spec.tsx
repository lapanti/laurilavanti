import type { ImageDataLike } from 'gatsby-plugin-image'

import { render, screen } from '@testing-library/react'
import React from 'react'

import { inFrontOfWoodsImage } from '../../../tests/images.mock'
import HeroImage from './HeroImage'

describe('<HeroImage />', () => {
    const alt = 'alt'

    it('should return null if no image', () => {
        const imageData: ImageDataLike = {
            id: '',
            parent: null,
            children: [],
            internal: { type: '', contentDigest: '', owner: '' },
        }
        const { container } = render(<HeroImage alt={alt} imageData={imageData} />)

        expect(container.firstChild).toBeNull()
    })

    it('should render actual image', () => {
        const { container } = render(<HeroImage alt={alt} imageData={inFrontOfWoodsImage} />)

        expect(screen.getByRole('img', { name: alt })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
