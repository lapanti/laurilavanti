import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

const Image = tw(GatsbyImage)`
    ml-auto mr-auto !h-[41rem] object-cover !w-full max-w-screen-fullhd overflow-hidden
`

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

const BigHeroImage = tw(BigHeroImageComponent)`
    flex col-span-full relative
`

export default BigHeroImage
