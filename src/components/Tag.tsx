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
        backgroundImage={data?.contentfulPage?.backgroundImage?.gatsbyImageData}
        heroImage={data?.contentfulPage?.image.gatsbyImageData}
        heroImageAlt={data?.contentfulPage?.image?.description}
        leftAlignedTitle={data?.contentfulPage?.leftAlignedTitle}
        pathname={`/blogi/${tag}/`}
        socialImage={data?.contentfulPage?.socialImage?.gatsbyImageData}
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
                gatsbyImageData(layout: CONSTRAINED, width: 768)
                description
            }
            backgroundImage {
                gatsbyImageData(layout: CONSTRAINED, width: 768)
            }
            socialImage {
                gatsbyImageData(layout: CONSTRAINED, width: 768)
            }
            leftAlignedTitle
        }
    }
`

export default Tag
