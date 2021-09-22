import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

interface Props {
    className?: string
    imageData: ImageDataLike
    alt: string
}

const HeroImageComponent = ({ className, imageData, alt }: Props): JSX.Element | null => {
    const image = getImage(imageData)
    return !image ? null : <GatsbyImage className={className} image={image} alt={alt} />
}

HeroImageComponent.displayName = 'HeroImage'

const HeroImage = tw(HeroImageComponent)`
    -mt-4.5 object-contain max-w-screen-fullhd w-full h-auto ml-auto mr-auto flex col-span-full
`

export default HeroImage
