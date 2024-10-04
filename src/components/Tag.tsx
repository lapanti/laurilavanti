import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'
import React from 'react'

import { WEBPAGE } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import Layout from './Layout'

interface Props {
    data: {
        contentfulPage: Pick<ContentfulPage, 'image'>
    }
    pageContext: {
        tag: string
    }
}

const Tag = ({ data, pageContext: { tag } }: Props): JSX.Element => (
    <Layout
        heroImage={data?.contentfulPage?.image?.localFile}
        heroImageAlt={data?.contentfulPage?.image?.description}
        pathname={`/blogi/${tag}/`}
        title={tag.replace(/^\w/, (c) => c.toUpperCase())}
        type={WEBPAGE}
        leftAlignedTitle
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
                            layout: FIXED
                            height: 384
                            width: 1920
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
