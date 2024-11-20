import type { ContentfulPost } from '../types/contentful'

import { graphql } from 'gatsby'
import React, { useMemo } from 'react'

import { getValueOrDefault } from '../lib/string'
import { BLOGPOSTING } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import H2 from './H2'
import Layout from './Layout'
import SocialShare from './post/SocialShare'

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
            backgroundImage,
            socialImage,
            metadata,
            title,
            updatedAt,
            publishedOld,
            published,
            excerpt,
            leftAlignedTitle,
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
            backgroundImage={backgroundImage?.localFile}
            body={body}
            description={excerpt}
            heroImage={headerImage.localFile}
            heroImageAlt={headerImage.description}
            leftAlignedTitle={leftAlignedTitle}
            modified={updatedAt}
            pathname={`/blogi/${slug}/`}
            publishDate={getValueOrDefault(publishDate, createdAt) as string}
            published={getValueOrDefault(publishedOld, published)}
            socialImage={socialImage?.localFile}
            tags={tags}
            title={title}
            type={BLOGPOSTING}
            showMeta
        >
            <SocialShare
                ariaLabel={`Kirjoituksen ${title} sosiaalisen median jakolinkit`}
                siteUrl={siteUrl}
                title={title}
            />
            <H2>Muita kirjoituksia</H2>
            <ExcerptList currentSlug={slug} limit={4} relatedTags={tags} />
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
                        image {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                            description
                        }
                    }
                    ... on ContentfulAsset {
                        __typename
                        contentful_id
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                        description
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
                            layout: CONSTRAINED
                            width: 864
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
            }
            backgroundImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: CONSTRAINED
                            width: 864
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
            }
            socialImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: CONSTRAINED
                            width: 600
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
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
            leftAlignedTitle
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`

export default Post
