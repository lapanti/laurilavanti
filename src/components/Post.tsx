import type { ContentfulPost } from '../types/contentful'

import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import tw from 'twin.macro'

import { BLOGPOSTING } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import H2 from './H2'
import HR from './HR'
import Layout from './Layout'
import SocialShare from './post/SocialShare'
import PostMeta from './PostMeta'

const PositionedMeta = tw(PostMeta)`
    col-start-3
`

interface Props {
    data: {
        contentfulPost: ContentfulPost
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
        contentfulPost: {
            createdAt,
            publishDate,
            body,
            headerImage,
            metadata,
            title,
            updatedAt,
            publishedOld,
            published,
            excerpt,
        },
        site: {
            siteMetadata: { siteUrl },
        },
    },
    pageContext: { slug },
}: Props): JSX.Element => {
    const tags = useMemo(() => metadata.tags.map(({ contentful_id }) => contentful_id), [metadata.tags])

    return (
        <Layout
            title={title}
            pathname={`/blogi/${slug}/`}
            heroImage={headerImage.localFile}
            description={excerpt}
            type={BLOGPOSTING}
            published={publishedOld || published}
            modified={updatedAt || publishedOld || published}
            body={body}
            preBody={<PositionedMeta date={publishDate || createdAt} tags={tags} />}
        >
            <SocialShare title={title} siteUrl={siteUrl} />
            <H2>Muita kirjoituksia</H2>
            <HR />
            <ExcerptList currentSlug={slug} limit={3} relatedTags={tags} />
        </Layout>
    )
}

export const query = graphql`
    query ($slug: String!) {
        contentfulPost(slug: { eq: $slug }) {
            createdAt(formatString: "L", locale: "fi")
            publishDate(formatString: "L", locale: "fi")
            body {
                raw
                references {
                    ... on ContentfulImageWithCaption {
                        __typename
                        contentful_id
                        caption
                        altText
                        image {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                        }
                    }
                    ... on ContentfulPost {
                        __typename
                        contentful_id
                        slug
                    }
                }
            }
            headerImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FIXED
                            height: 667
                            width: 1920
                            transformOptions: { fit: OUTSIDE }
                            aspectRatio: 2.87
                        )
                    }
                }
            }
            metadata {
                tags {
                    contentful_id
                }
            }
            title
            updatedAt
            publishedOld: publishDate
            published: createdAt
            excerpt
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`

export default Post
