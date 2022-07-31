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
        mobileHeroImage={data?.contentfulPage?.mobileImage?.localFile}
        title={tag.replace(/^\w/, (c) => c.toUpperCase())}
        pathname={`/blogi/${tag}/`}
        type={WEBPAGE}
    >
        <ExcerptList tag={tag} />
    </Layout>
)

export const query = graphql`
    {
        contentfulPage(slug: { eq: "blogi" }) {
            metaImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
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
            }
            mobileImage {
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
            }
        }
    }
`

export default Tag
