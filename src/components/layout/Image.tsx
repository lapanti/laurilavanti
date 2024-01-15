import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { fontSizes, sizes } from '../../lib/styles'

const Img = styled(GatsbyImage)({
    width: '100%',
    height: 'auto',
    display: 'flex',
})

const Caption = styled.figcaption({
    marginTop: sizes[2],
    fontStyle: 'italic',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    ...fontSizes.m,
})

export interface ImageProps {
    alt: string
    caption: string
}

interface Props extends ImageProps {
    className?: string
    imageData: ImageDataLike
}

const ImageComponent = ({ className, imageData, alt, caption }: Props): JSX.Element | null => {
    const image = getImage(imageData)
    return !image ? null : (
        <figure className={className} aria-label={caption}>
            <Img image={image} alt={alt} />
            <Caption>{caption}</Caption>
        </figure>
    )
}

ImageComponent.displayName = 'Image'

const Image = styled(ImageComponent)({
    gridColumn: '1 / -1',
    marginTop: sizes[4],
    marginBottom: sizes[4],
})

export default Image
