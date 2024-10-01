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
        body={data?.contentfulPage?.body}
        description={getValueOrDefault(data?.contentfulPage?.description, '')}
        heroImage={data?.contentfulPage?.image?.localFile}
        heroImageAlt={data?.contentfulPage?.image?.description}
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
                    ... on ContentfulContactInfo {
                        __typename
                        contentful_id
                        links {
                            contentful_id
                            title
                            url
                            icon
                        }
                    }
                    ... on ContentfulExcerptList {
                        __typename
                        contentful_id
                        limit
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
                            width: 1920
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
                            width: 600
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

export default Page
