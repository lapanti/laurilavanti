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

const FrontPage = ({ data, pageContext: { slug } }: Props): JSX.Element => (
    <Layout
        backgroundImage={data?.contentfulPage?.backgroundImage?.localFile}
        body={data?.contentfulPage?.body}
        description={data?.contentfulPage?.description ?? ''}
        heroImage={data?.contentfulPage?.image?.localFile}
        heroImageAlt={data?.contentfulPage?.image?.description}
        modified={data?.contentfulPage?.updatedAt}
        pathname={`/${slug}/`}
        secondaryTitle={data?.contentfulPage?.secondaryTitle ?? undefined}
        socialImage={data?.contentfulPage?.socialImage?.localFile}
        subtitle={data?.contentfulPage?.subtitle ?? undefined}
        title={data?.contentfulPage?.title}
        type={data?.contentfulPage?.jsonLdType}
        isFrontPage
        leftAlignedTitle
    />
)

export const query = graphql`
    query ($slug: String!) {
        contentfulPage(slug: { eq: $slug }) {
            description
            jsonLdType
            title
            subtitle
            secondaryTitle
            body {
                raw
                references {
                    ... on ContentfulExcerptList {
                        __typename
                        contentful_id
                        limit
                        pinned {
                            slug
                        }
                    }
                    ... on ContentfulCurriculumVitae {
                        __typename
                        fiduciariesTitle
                        fiduciaries {
                            duty
                            organization
                            startYear
                            endYear
                        }
                        degreesTitle
                        degrees {
                            degree
                            school
                            location
                            startYear
                            endYear
                        }
                        jobExperiencesTitle
                        jobExperiences {
                            title
                            company
                            location
                            startYear
                            endYear
                        }
                    }
                    ... on ContentfulContactInfoLink {
                        __typename
                        title
                        url
                        icon
                    }
                }
            }
            image {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: NONE
                            layout: CONSTRAINED
                            width: 576
                            aspectRatio: 1
                            sizes: "(min-width: 560px) 560px, 100vw"
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
            }
            socialImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: NONE
                            layout: CONSTRAINED
                            width: 576
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
            }
            backgroundImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: CONSTRAINED
                            width: 576
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
            }
            updatedAt
        }
    }
`

export default FrontPage
