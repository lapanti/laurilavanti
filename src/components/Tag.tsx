import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'
import React from 'react'

import { WEBPAGE } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import Layout from './Layout'

interface Props {
    data: {
        contentfulPage: Pick<ContentfulPage, 'metaImage' | 'image'>
    }
    pageContext: {
        tag: string
    }
}

const Tag = ({ data, pageContext: { tag } }: Props): JSX.Element => (
    <Layout
        heroImage={data?.contentfulPage?.image?.localFile}
        metaImage={data?.contentfulPage?.metaImage?.localFile}
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
                            height: 667
                            width: 1920
                            transformOptions: { fit: OUTSIDE }
                            aspectRatio: 2.87
                        )
                    }
                }
            }
        }
    }
`

export default Tag
