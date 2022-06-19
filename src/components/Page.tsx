import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { JsonLdType } from '../types/jsonld'

// @ts-expect-error untyped library
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import tw from 'twin.macro'

import ExternalLink from './ExternalLink'
import H2 from './H2'
import Layout from './Layout'
import Paragraph from './Paragraph'

const PositionedP = tw(Paragraph)`
    col-start-3
`

const components = {
    p: PositionedP,
    h2: H2,
    a: ExternalLink,
}

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
    <MDXProvider components={components}>
        <Layout
            title={hideTitle ? undefined : title}
            hiddenTitle={hideTitle ? title : undefined}
            pathname={`/${slug}`}
            heroImage={image}
            metaImage={metaImage}
            description={description || ''}
            type={jsonLdType}
            modified={updatedAt}
        >
            {renderRichText(body)}
        </Layout>
    </MDXProvider>
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
                        contentful_id
                        sys {
                            contentType {
                                sys {
                                    id
                                }
                            }
                        }
                    }
                    ... on ContentfulHomeTitle {
                        contentful_id
                        sys {
                            contentType {
                                sys {
                                    id
                                }
                            }
                        }
                    }
                    ... on ContentfulImageWithCaption {
                        contentful_id
                        sys {
                            contentType {
                                sys {
                                    id
                                }
                            }
                        }
                        altText
                        image {
                            gatsbyImageData
                        }
                        caption
                    }
                    ... on ContentfulExcerptList {
                        contentful_id
                        limit
                        sys {
                            contentType {
                                sys {
                                    id
                                }
                            }
                        }
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
