import type { ImageDataLike } from 'gatsby-plugin-image'

// @ts-expect-error untyped library
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import tw from 'twin.macro'

import ExcerptList from './ExcerptList'
import ExternalLink from './ExternalLink'
import H2 from './H2'
import HR from './HR'
import Page from './Page'
import Paragraph from './Paragraph'
import PostMeta from './PostMeta'

const PositionedP = tw(Paragraph)`
    col-start-3
`

const components = {
    p: PositionedP,
    h2: H2,
    a: ExternalLink,
}

const PositionedMeta = tw(PostMeta)`
    col-start-3
`

interface Props {
    data: {
        mdx: {
            frontmatter: {
                title: string
                tags: string[]
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
            frontmatter: { title, tags, date, image: imageData, description },
            fields: {
                readingTime: { time },
            },
            body,
        },
    },
}: Props): JSX.Element => {
    console.log('description', description)
    return (
        <MDXProvider components={components}>
            <Page title={title} heroImage={imageData}>
                <PositionedMeta readingTime={time} date={date} tags={tags} />
                <MDXRenderer>{body}</MDXRenderer>
                <H2>Muita kirjoituksia</H2>
                <HR />
                <ExcerptList limit={3} relatedTags={tags} />
            </Page>
        </MDXProvider>
    )
}

export const query = graphql`
    query ($slug: String!) {
        mdx(slug: { eq: $slug }) {
            frontmatter {
                title
                tags
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
