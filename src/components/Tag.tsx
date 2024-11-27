import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'
import React from 'react'

import { WEBPAGE } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import Layout from './Layout'

interface Props {
    data: {
        contentfulPage: Pick<ContentfulPage, 'image' | 'backgroundImage' | 'leftAlignedTitle' | 'socialImage'>
    }
    pageContext: {
        tag: string
    }
}

const Tag = ({ data, pageContext: { tag } }: Props): JSX.Element => (
    <Layout
        backgroundImage={data?.contentfulPage?.backgroundImage?.localFile}
        heroImage={data?.contentfulPage?.image?.localFile}
        heroImageAlt={data?.contentfulPage?.image?.description}
        leftAlignedTitle={data?.contentfulPage?.leftAlignedTitle}
        pathname={`/blogi/${tag}/`}
        socialImage={data?.contentfulPage?.socialImage?.localFile}
        title={tag.replace(/^\w/, (c) => c.toUpperCase())}
        type={WEBPAGE}
    >
        <ExcerptList tag={tag} />
    </Layout>
)

export const query = graphql`
    {
        contentfulPage(slug: { eq: "blogi" }) {
            image {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: CONSTRAINED
                            width: 864
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
            }
            backgroundImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: CONSTRAINED
                            width: 864
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
            }
            socialImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: NONE
                            layout: CONSTRAINED
                            width: 600
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
            }
            leftAlignedTitle
        }
    }
`

export default Tag
