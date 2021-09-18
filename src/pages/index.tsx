import type { ImageDataLike } from 'gatsby-plugin-image'

import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import tw from 'twin.macro'

import ExcerptList from '../components/ExcerptList'
import Page from '../components/Page'

const Image = tw(GatsbyImage)`
    -mt-4.5 object-contain max-w-screen-fullhd w-full h-auto ml-auto mr-auto flex col-span-full
`

const H1 = tw.h1`
    text-3xl text-accent font-bold col-start-3
`

const List = tw.dl`
    flex flex-col items-end my-6
`

const Term = tw.dt`
    self-start
`

const H2 = tw.h2`
    col-start-3 mt-8 font-bold text-xl text-accent
`

const HR = tw.hr`
    col-start-3 mb-4
`

const Index = (): JSX.Element => {
    const data = useStaticQuery<{ heroImg: ImageDataLike }>(graphql`
        query {
            heroImg: file(relativePath: { eq: "pyoraily-harjoituksia.jpg" }) {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                }
            }
        }
    `)
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
            <H2>Uusimmat kirjoitukset</H2>
            <HR />
            <ExcerptList limit={3} />
        </Page>
    )
}

export default Index
