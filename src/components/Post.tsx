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
    },
    pageContext: { slug },
}: Props): JSX.Element => (
    <MDXProvider components={components}>
        <Page
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
            <aside>
                <span>Jaa:</span>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url | url_encode }}`}
                    target="_blank"
                    title="Jaa Facebookissa"
                    rel="noreferrer"
                >
                    <svg>
                        <use xlinkHref="#icon-facebook" />
                    </svg>
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?{% if site.twitter.username %}via={{ site.twitter.username | url_encode }}&{% endif %}text={{ page.title | url_encode }}%20{{ page.url | absolute_url | url_encode }}`}
                    target="_blank"
                    title="Jaa Twitterissä"
                    rel="noreferrer"
                >
                    <svg>
                        <use xlinkHref="#icon-twitter" />
                    </svg>
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url={{ page.url | absolute_url | url_encode }}`}
                    target="_blank"
                    title="Jaa LinkedInissä"
                    rel="noreferrer"
                >
                    <svg>
                        <use xlinkHref="#icon-linkedin" />
                    </svg>
                </a>
            </aside>
            <H2>Muita kirjoituksia</H2>
            <HR />
            <ExcerptList limit={3} relatedTags={tags} />
        </Page>
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
    }
`

export default Post
