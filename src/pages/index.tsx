import type { ImageDataLike } from 'gatsby-plugin-image'

import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import tw from 'twin.macro'

import ExcerptList from '../components/ExcerptList'
import HR from '../components/HR'
import Page from '../components/Page'

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
    return (
        <Page heroImage={data.heroImg} imageAlt="Pyöräilyn harjoittelua tyttäreni kanssa">
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
