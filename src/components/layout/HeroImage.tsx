import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { HEADER_SIZE, sizes } from '../../lib/styles'

const Image = styled(GatsbyImage)({
    marginLeft: 'auto',
    marginRight: 'auto',
    height: `${sizes[24]} !important`,
    width: '100% !important',
    objectFit: 'cover',
    maxWidth: sizes.fullHd,
    overflow: 'hidden',
})

interface Props {
    className?: string
    imageData: ImageDataLike
    alt: string
}

const HeroImageComponent = ({ className, imageData, alt }: Props): JSX.Element | null => {
    const image = getImage(imageData)
    return !image ? null : (
        <div className={className}>
            <Image image={image} alt={alt} />
        </div>
    )
}

HeroImageComponent.displayName = 'HeroImage'

const HeroImage = styled(HeroImageComponent)({
    paddingTop: HEADER_SIZE,
    display: 'flex',
    gridColumn: '1 / -1',
    position: 'relative',
})

export default HeroImage
