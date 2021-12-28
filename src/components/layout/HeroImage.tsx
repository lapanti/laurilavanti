import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

import Number from './heroImage/Number'

const Image = tw(GatsbyImage)`
    object-contain max-w-screen-fullhd w-full h-auto ml-auto mr-auto 
`

const StyledNumber = tw(Number)`
    absolute bottom-1/4 translate-y-1/2 right-1/4 translate-x-3/4
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
            <StyledNumber />
        </div>
    )
}

HeroImageComponent.displayName = 'HeroImage'

const HeroImage = tw(HeroImageComponent)`
    -mt-4.5 flex col-span-full relative
`

export default HeroImage
