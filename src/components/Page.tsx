import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { JsonLdType } from '../types/jsonld'

import { graphql } from 'gatsby'
import React from 'react'

import Layout from './Layout'

interface Props {
    data: {
        contentfulPage: {
            description: string | null
            hideTitle: boolean
            jsonLdType: JsonLdType
            title: string
            body: RenderRichTextData<ContentfulRichTextGatsbyReference>
            metaImage?: ImageDataLike
            image?: ImageDataLike
            updatedAt: string
        }
    }
    pageContext: {
        slug: string
    }
}

const Page = ({
    data: {
        contentfulPage: { description, hideTitle, jsonLdType, title, body, metaImage, image, updatedAt },
    },
    pageContext: { slug },
}: Props): JSX.Element => (
    <Layout
        title={hideTitle ? undefined : title}
        hiddenTitle={hideTitle ? title : undefined}
        pathname={`/${slug}`}
        heroImage={image}
        metaImage={metaImage}
        description={description || ''}
        type={jsonLdType}
        modified={updatedAt}
        body={body}
    />
)

export const query = graphql`
    query ($slug: String!) {
        contentfulPage(slug: { eq: $slug }) {
            description
            hideTitle
            jsonLdType
            title
            body {
                raw
                references {
                    ... on ContentfulContactInfo {
                        __typename
                        contentful_id
                    }
                    ... on ContentfulHomeTitle {
                        __typename
                        contentful_id
                    }
                    ... on ContentfulImageWithCaption {
                        __typename
                        contentful_id
                        altText
                        image {
                            gatsbyImageData
                        }
                        caption
                    }
                    ... on ContentfulExcerptList {
                        __typename
                        contentful_id
                        limit
                    }
                }
            }
            metaImage {
                gatsbyImageData
            }
            image {
                gatsbyImageData(placeholder: BLURRED)
            }
            updatedAt
        }
    }
`

export default Page
