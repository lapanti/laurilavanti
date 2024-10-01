import type { ImageDataLike } from 'gatsby-plugin-image'

import { render, screen } from '@testing-library/react'
import React from 'react'

import { inFrontOfWoodsImage } from '../../../tests/images.mock'
import Image from './Image'

describe('<Image />', () => {
    const alt = 'alt'
    const caption = 'My caption'

    it('should return null if no image data', () => {
        const imageData: ImageDataLike = {
            id: '',
            parent: null,
            children: [],
            internal: { type: '', contentDigest: '', owner: '' },
        }
        const { container } = render(<Image imageData={imageData} alt={alt} caption={caption} />)

        expect(container.firstChild).toBeNull()
    })

    it('should render image with caption', () => {
        const { container } = render(<Image imageData={inFrontOfWoodsImage} caption={caption} alt={alt} />)

        expect(screen.getByRole('img', { name: alt })).toBeInTheDocument()
        expect(screen.getByRole('figure', { name: caption })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
