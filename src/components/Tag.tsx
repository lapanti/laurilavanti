import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'
import React from 'react'

import { WEBPAGE } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import Layout from './Layout'

interface Props {
    data: {
        contentfulPage: Pick<ContentfulPage, 'mobileImage' | 'image'>
    }
    pageContext: {
        tag: string
    }
}

const Tag = ({ data, pageContext: { tag } }: Props): JSX.Element => (
    <Layout
        heroImage={data?.contentfulPage?.image?.localFile}
        heroImageAlt={data?.contentfulPage?.image?.description}
        mobileHeroImage={data?.contentfulPage?.mobileImage?.localFile}
        mobileHeroImageAlt={data?.contentfulPage?.mobileImage?.description}
        title={tag.replace(/^\w/, (c) => c.toUpperCase())}
        pathname={`/blogi/${tag}/`}
        type={WEBPAGE}
    >
        <ExcerptList tag={tag} />
    </Layout>
)

export const query = graphql`
    query Tag {
        contentfulPage(slug: { eq: "blogi" }) {
            image {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FIXED
                            height: 384
                            width: 1920
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
            }
            mobileImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FIXED
                            height: 384
                            width: 478
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
            }
        }
    }
`

export default Tag
