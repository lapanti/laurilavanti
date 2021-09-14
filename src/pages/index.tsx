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

const H1 = tw.h1`
    text-3xl text-accent font-bold col-start-3 col-end-auto
`

const List = tw.dl`
    flex flex-col items-end
`

const Term = tw.dt`
    self-start
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
            {image && <Image image={image} alt="Pyöräilyn harjoittelua tyttäreni kanssa" />}
            <H1>
                <List>
                    <Term>Lauri Lavanti</Term>
                    <dd>Isä</dd>
                    <dd>Kirkkonummelainen</dd>
                    <dd>Ohjelmistokehittäjä</dd>
                    <dd>Diplomi-insinööri</dd>
                </List>
            </H1>
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
