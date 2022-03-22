import type { ImageDataLike } from 'gatsby-plugin-image'

// @ts-expect-error untyped library
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import tw from 'twin.macro'

import { BLOGPOSTING } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import ExternalLink from './ExternalLink'
import H2 from './H2'
import HR from './HR'
import Layout from './Layout'
import Paragraph from './Paragraph'
import SocialShare from './post/SocialShare'
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
                published: string
                modified: string | null
            }
            fields: {
                readingTime: {
                    time: number
                }
            }
            body: string
        }
        site: {
            siteMetadata: {
                siteUrl: string
            }
        }
    }
    pageContext: {
        slug: string
    }
}

const Post = ({
    data: {
        mdx: {
            frontmatter: { title, tags, date, image: imageData, description, published, modified },
            fields: {
                readingTime: { time },
            },
            body,
        },
        site: {
            siteMetadata: { siteUrl },
        },
    },
    pageContext: { slug },
}: Props): JSX.Element => (
    <MDXProvider components={components}>
        <Layout
            title={title}
            pathname={`/${slug}`}
            heroImage={imageData}
            description={description}
            type={BLOGPOSTING}
            published={published}
            modified={modified || published}
        >
            <PositionedMeta readingTime={time} date={date} tags={tags} />
            <MDXRenderer>{body}</MDXRenderer>
            <SocialShare title={title} siteUrl={siteUrl} />
            <H2>Muita kirjoituksia</H2>
            <HR />
            <ExcerptList currentSlug={slug} limit={3} relatedTags={tags} />
        </Layout>
    </MDXProvider>
)

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
                published: date
                modified
            }
            fields {
                readingTime {
                    time
                }
            }
            body
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`

export default Post
