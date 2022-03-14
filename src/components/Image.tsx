import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

import ExternalLink from './ExternalLink'

const Img = tw(GatsbyImage)`
     w-full h-auto flex
`

const Caption = tw.figcaption`
    mt-2 text-base italic flex flex-row justify-center w-full
`

export interface ImageProps {
    alt: string
    caption?: string
    link?: string
}

interface Props extends ImageProps {
    className?: string
    imageData: ImageDataLike
}

const ImageComponent = ({ className, imageData, alt, caption, link }: Props): JSX.Element | null => {
    const image = getImage(imageData)
    return !image ? null : (
        <figure className={className} aria-label={caption}>
            <Img image={image} alt={alt} />
            {caption && <Caption>{link ? <ExternalLink href={link}>{caption}</ExternalLink> : caption}</Caption>}
        </figure>
    )
}

ImageComponent.displayName = 'Image'

const Image = tw(ImageComponent)`
    col-span-full my-4
`

export default Image
