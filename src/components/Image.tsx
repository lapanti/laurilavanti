import type { IGatsbyImageData } from 'gatsby-plugin-image'

import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

const Img = tw(GatsbyImage)`
     w-full h-auto flex
`

const Caption = tw.figcaption`
    mt-2 text-base italic flex flex-row justify-center w-full
`

interface Props {
    className?: string
    image?: IGatsbyImageData
    alt: string
    caption?: string
    link?: string
}

const ImageComponent = ({ className, image, alt, caption, link }: Props): JSX.Element | null =>
    !image ? null : (
        <figure className={className}>
            <Img image={image} alt={alt} />
            {caption && (
                <Caption>
                    {link ? (
                        <a href={link} target="_blank" rel="noreferrer">
                            {caption}
                        </a>
                    ) : (
                        caption
                    )}
                </Caption>
            )}
        </figure>
    )

ImageComponent.displayName = 'Image'

const Image = tw(ImageComponent)`
    col-span-full my-4
`

export default Image
