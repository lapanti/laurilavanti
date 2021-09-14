import type { PageProps } from 'gatsby'
import type { ImageDataLike } from 'gatsby-plugin-image'

import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import tw from 'twin.macro'

import Page from '../components/Page'

const Image = tw(GatsbyImage)`
    -mt-4.5 object-contain max-w-screen-fullhd w-full h-auto ml-auto mr-auto flex col-span-full
`

interface Props extends PageProps {
    data: {
        heroImg: ImageDataLike
    }
}

// markup
const Index = ({ data }: Props): JSX.Element => {
    const image = getImage(data.heroImg)
    return (
        <Page>
            <article>
                {image && <Image image={image} alt="Pyöräilyn harjoittelua tyttäreni kanssa" />}
                <h1>
                    <dl>
                        <dt>Lauri Lavanti</dt>
                        <dd>Isä</dd>
                        <dd>Kirkkonummelainen</dd>
                        <dd>Ohjelmistokehittäjä</dd>
                        <dd>Diplomi-insinööri</dd>
                    </dl>
                </h1>
            </article>
        </Page>
    )
}

export const pageQuery = graphql`
    query {
        heroImg: file(relativePath: { eq: "pyoraily-harjoituksia-xxxl.jpg" }) {
            childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
            }
        }
    }
`

export default Index
