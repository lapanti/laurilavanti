import type { ImageDataLike } from 'gatsby-plugin-image'

// @ts-expect-error untyped library
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import tw from 'twin.macro'

import H2 from './H2'
import Page from './Page'
import Paragraph from './Paragraph'

const PositionedP = tw(Paragraph)`
    col-start-3
`

const components = {
    p: PositionedP,
    h2: H2,
}

interface Props {
    data: {
        mdx: {
            frontmatter: {
                title: string
                categories: string[]
                date: string
                image: ImageDataLike
                description: string
            }
            fields: {
                readingTime: {
                    time: number
                }
            }
            body: string
        }
    }
}

const Post = ({
    data: {
        mdx: {
            frontmatter: { title, categories, date, image: imageData, description },
            fields: {
                readingTime: { time },
            },
            body,
        },
    },
}: Props): JSX.Element => {
    console.log('categories', categories, 'date', date, 'description', description, 'time', time)
    return (
        <MDXProvider components={components}>
            <Page title={title} heroImage={imageData}>
                <MDXRenderer>{body}</MDXRenderer>
            </Page>
        </MDXProvider>
    )
}

export const query = graphql`
    query ($slug: String!) {
        mdx(slug: { eq: $slug }) {
            frontmatter {
                title
                categories
                date(formatString: "L", locale: "fi")
                image {
                    childImageSharp {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
                description
            }
            fields {
                readingTime {
                    time
                }
            }
            body
        }
    }
`

export default Post
