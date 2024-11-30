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
        backgroundImage={data?.contentfulPage?.backgroundImage?.gatsbyImageData}
        body={data?.contentfulPage?.body}
        description={getValueOrDefault(data?.contentfulPage?.description, '')}
        heroImage={data?.contentfulPage?.image.gatsbyImageData}
        heroImageAlt={data?.contentfulPage?.image?.description}
        leftAlignedTitle={data?.contentfulPage?.leftAlignedTitle}
        modified={data?.contentfulPage?.updatedAt}
        pathname={`/${slug}/`}
        socialImage={data?.contentfulPage?.socialImage?.gatsbyImageData}
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
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 768, formats: [AUTO, WEBP, AVIF])
                description
            }
            backgroundImage {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 768, formats: [AUTO, WEBP, AVIF])
            }
            socialImage {
                gatsbyImageData(placeholder: NONE, layout: CONSTRAINED, width: 768, formats: [AUTO, WEBP, AVIF])
            }
            updatedAt
            leftAlignedTitle
        }
    }
`

export default Page
