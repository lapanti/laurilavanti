import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ImageProps } from '../components/Image'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import tw from 'twin.macro'

import Image from '../components/Image'

interface Props extends ImageProps {
    className?: string
}

const KirkkonummenGraffitiseinaComponent = ({ className, alt, caption, link }: Props): JSX.Element | null => {
    const query = useStaticQuery<{ img: ImageDataLike }>(graphql`
        query {
            img: file(relativePath: { eq: "kirkkonummen-graffitiseina.jpg" }) {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                }
            }
        }
    `)

    return <Image className={className} imageData={query.img} alt={alt} caption={caption} link={link} />
}

KirkkonummenGraffitiseinaComponent.displayName = 'KirkkonummenGraffitiseina'

const KirkkonummenGraffitiseina = tw(KirkkonummenGraffitiseinaComponent)``

export default KirkkonummenGraffitiseina
