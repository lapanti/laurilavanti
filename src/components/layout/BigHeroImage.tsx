import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { HEADER_SIZE, sizes } from '../../lib/styles'

const Image = styled(GatsbyImage)({
    marginLeft: 'auto',
    marginRight: 'auto',
    height: `${sizes[164]} !important`,
    objectFit: 'cover',
    width: '100% !important',
    maxWidth: sizes.fullHd,
    overflow: 'hidden',
})

interface Props {
    className?: string
    imageData: ImageDataLike
    alt: string
}

const BigHeroImageComponent = ({ className, imageData, alt }: Props): JSX.Element | null => {
    const image = getImage(imageData)
    return !image ? null : (
        <div className={className}>
            <Image image={image} alt={alt} />
        </div>
    )
}

BigHeroImageComponent.displayName = 'BigHeroImage'

const BigHeroImage = styled(BigHeroImageComponent)({
    paddingTop: HEADER_SIZE,
    display: 'flex',
    position: 'relative',
    gridColumn: '1 / -1',
})

export default BigHeroImage
