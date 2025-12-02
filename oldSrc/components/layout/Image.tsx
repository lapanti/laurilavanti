import type { IGatsbyImageData } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { sizes, typographics } from '../../lib/styles'

const Img = styled(GatsbyImage)({
    display: 'flex',
    height: 'auto',
    width: '100%',
})

const Caption = styled.figcaption({
    ...typographics.additionalInfo,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizes[0.5],
    width: '100%',
})

interface ImageProps {
    alt: string
    caption: string
}

interface Props extends ImageProps {
    className?: string
    imageData?: IGatsbyImageData
}

const ImageComponent = ({ className, imageData, alt, caption }: Props): JSX.Element | null => {
    const image = getImage(imageData ?? null)

    return !image ? null : (
        <figure aria-label={caption} className={className}>
            <Img alt={alt} image={image} objectFit="contain" />
            <Caption>{caption}</Caption>
        </figure>
    )
}

ImageComponent.displayName = 'Image'

const Image = styled(ImageComponent)({
    gridColumnStart: 3,
    marginBottom: sizes[1],
    marginTop: sizes[1],
})

export default Image
