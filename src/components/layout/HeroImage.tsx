import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

const Image = tw(GatsbyImage)`
    object-contain max-w-screen-fullhd w-full h-auto ml-auto mr-auto 
`

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

const HeroImage = tw(HeroImageComponent)`
    flex col-span-full relative
`

export default HeroImage
