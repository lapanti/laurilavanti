import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'

import Page from '../components/Page'

// markup
const Index = ({ data }): JSX.Element => {
    const image = getImage(data.heroImg)
    return (
        <Page>
            <article>
                <GatsbyImage image={image} alt="Pyöräilyn harjoittelua tyttäreni kanssa" />
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
