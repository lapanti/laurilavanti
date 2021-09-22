import type { ImageDataLike } from 'gatsby-plugin-image'
import type { JsonLdType } from '../types/jsonld'

// @ts-expect-error untyped library
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
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
        mdx: {
            frontmatter: {
                title?: string
                hiddenTitle?: string
                image?: ImageDataLike
                metaImage?: ImageDataLike
                description: string
                modified: string | null
                jsonLdType: JsonLdType
            }
            body: string
        }
    }
    pageContext: {
        slug: string
    }
}

const Page = ({
    data: {
        mdx: {
            frontmatter: { title, hiddenTitle, image, metaImage, description, modified, jsonLdType },
            body,
        },
    },
    pageContext: { slug },
}: Props): JSX.Element => (
    <MDXProvider components={components}>
        <Layout
            title={title}
            hiddenTitle={hiddenTitle}
            pathname={`/${slug}`}
            heroImage={image}
            metaImage={metaImage}
            description={description}
            type={jsonLdType}
            modified={modified || undefined}
        >
            <MDXRenderer>{body}</MDXRenderer>
        </Layout>
    </MDXProvider>
)

export const query = graphql`
    query ($slug: String!) {
        mdx(slug: { eq: $slug }) {
            frontmatter {
                title
                hiddenTitle
                image {
                    childImageSharp {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
                metaImage {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                description
                modified
                jsonLdType
            }
            body
        }
    }
`

export default Page
