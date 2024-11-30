import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'
import React from 'react'

import { getValueOrDefault } from '../lib/string'
import Layout from './Layout'

interface Props {
    data: {
        contentfulPage: ContentfulPage
    }
    pageContext: {
        slug: string
    }
}

const Page = ({ data, pageContext: { slug } }: Props): JSX.Element => (
    <Layout
        backgroundImage={data?.contentfulPage?.backgroundImage?.localFile}
        body={data?.contentfulPage?.body}
        description={getValueOrDefault(data?.contentfulPage?.description, '')}
        heroImage={data?.contentfulPage?.image?.localFile}
        heroImageAlt={data?.contentfulPage?.image?.description}
        leftAlignedTitle={data?.contentfulPage?.leftAlignedTitle}
        modified={data?.contentfulPage?.updatedAt}
        pathname={`/${slug}/`}
        socialImage={data?.contentfulPage?.socialImage?.localFile}
        title={data?.contentfulPage?.title}
        type={data?.contentfulPage?.jsonLdType}
    />
)

export const query = graphql`
    query ($slug: String!) {
        contentfulPage(slug: { eq: $slug }) {
            description
            jsonLdType
            title
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
                        contentful_id
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
                        contentful_id
                        icon
                        url
                        title
                    }
                    ... on ContentfulYearsFrom {
                        __typename
                        contentful_id
                        dateToCountFrom
                    }
                }
            }
            image {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: CONSTRAINED
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
                            placeholder: NONE
                            layout: CONSTRAINED
                            formats: [AUTO, WEBP, AVIF]
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
            }
            updatedAt
            leftAlignedTitle
        }
    }
`

export default Page
