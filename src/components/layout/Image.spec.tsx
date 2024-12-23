import { render, screen } from '@testing-library/react'

import { inFrontOfWoodsImage } from '../../../tests/images.mock'
import Image from './Image'

describe('<Image />', () => {
    const alt = 'alt'
    const caption = 'My caption'

    it('should return null if no image data', () => {
        const { container } = render(<Image alt={alt} caption={caption} />)

        expect(container.firstChild).toBeNull()
    })

    it('should render image with caption', () => {
        const { container } = render(<Image alt={alt} caption={caption} imageData={inFrontOfWoodsImage} />)

        expect(screen.getByRole('img', { name: alt })).toBeInTheDocument()
        expect(screen.getByRole('figure', { name: caption })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
