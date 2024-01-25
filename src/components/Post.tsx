import type { ContentfulPost } from '../types/contentful'

import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { sizes } from '../lib/styles'
import { BLOGPOSTING } from '../types/jsonld'
import ExcerptList from './ExcerptList'
import H2 from './H2'
import Hr from './Hr'
import Layout from './Layout'
import SocialShare from './post/SocialShare'
import PostMeta from './PostMeta'

const PositionedMeta = styled(PostMeta)({
    gridColumnStart: 3,
    marginTop: sizes[4],
})

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
            mobileHeaderImage,
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
            heroImageAlt={headerImage.description}
            mobileHeroImage={mobileHeaderImage.localFile}
            mobileHeroImageAlt={mobileHeaderImage.description}
            description={excerpt}
            type={BLOGPOSTING}
            published={publishedOld || published}
            modified={updatedAt}
            body={body}
            preBody={
                <PositionedMeta
                    date={publishDate || createdAt}
                    tags={tags}
                    ariaLabel={`Kirjoituksen ${title} meta-tiedot`}
                />
            }
        >
            <SocialShare
                ariaLabel={`Kirjoituksen ${title} sosiaalisen median jakolinkit`}
                title={title}
                siteUrl={siteUrl}
            />
            <H2>Muita kirjoituksia</H2>
            <Hr />
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
                            description
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
                            height: 384
                            width: 1920
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
            }
            mobileHeaderImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FIXED
                            height: 384
                            width: 478
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
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
