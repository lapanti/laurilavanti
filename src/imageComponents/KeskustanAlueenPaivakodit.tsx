import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ImageProps } from '../components/Image'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import tw from 'twin.macro'

import Image from '../components/Image'

interface Props extends ImageProps {
    className?: string
}

const KeskustanAlueenPaivakoditComponent = ({ className, alt, caption, link }: Props): JSX.Element | null => {
    const query = useStaticQuery<{ img: ImageDataLike }>(graphql`
        query {
            img: file(relativePath: { eq: "keskustan-alueen-paivakodit.jpg" }) {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                }
            }
        }
    `)

    return <Image className={className} imageData={query.img} alt={alt} caption={caption} link={link} />
}

KeskustanAlueenPaivakoditComponent.displayName = 'KeskustanAlueenPaivakodit'

const KeskustanAlueenPaivakodit = tw(KeskustanAlueenPaivakoditComponent)``

export default KeskustanAlueenPaivakodit
