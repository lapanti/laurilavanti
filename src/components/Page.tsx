import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'
import React from 'react'

import Layout from './Layout'

interface Props {
    data: {
        contentfulPage: ContentfulPage
    }
    pageContext: {
        slug: string
    }
}

const Page = ({ data, pageContext: { slug } }: Props): JSX.Element => (
    <Layout
        title={data?.contentfulPage?.hideTitle ? undefined : data?.contentfulPage?.title}
        hiddenTitle={data?.contentfulPage?.hideTitle ? data?.contentfulPage?.title : undefined}
        pathname={`/${slug}/`}
        heroImage={data?.contentfulPage?.image?.localFile}
        metaImage={data?.contentfulPage?.metaImage?.localFile}
        description={data?.contentfulPage?.description || ''}
        type={data?.contentfulPage?.jsonLdType}
        modified={data?.contentfulPage?.updatedAt}
        body={data?.contentfulPage?.body}
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
                        links {
                            contentful_id
                            title
                            url
                            icon
                        }
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
                            localFile {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
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
                localFile {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
            image {
                localFile {
                    childImageSharp {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
            }
            updatedAt
        }
    }
`

export default Page
