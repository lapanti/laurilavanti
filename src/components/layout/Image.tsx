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
    marginTop: sizes[0.5],
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
        <figure aria-label={caption} className={className}>
            <Img alt={alt} image={image} />
            <Caption>{caption}</Caption>
        </figure>
    )
}

ImageComponent.displayName = 'Image'

const Image = styled(ImageComponent)({
    gridColumn: '1 / -1',
    marginTop: sizes[1],
    marginBottom: sizes[1],
})

export default Image
