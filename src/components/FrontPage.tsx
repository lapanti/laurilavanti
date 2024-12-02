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
        backgroundImage={data?.contentfulPage?.backgroundImage?.gatsbyImageData}
        body={data?.contentfulPage?.body}
        description={data?.contentfulPage?.description ?? ''}
        heroImage={data?.contentfulPage?.image.gatsbyImageData}
        heroImageAlt={data?.contentfulPage?.image?.description}
        modified={data?.contentfulPage?.updatedAt}
        pathname={`/${slug}/`}
        secondaryTitle={data?.contentfulPage?.secondaryTitle ?? undefined}
        socialImage={data?.contentfulPage?.socialImage?.gatsbyImageData}
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
                gatsbyImageData(
                    placeholder: NONE
                    layout: CONSTRAINED
                    width: 560
                    sizes: "(min-width: 560px) 560px, 320px"
                )
                description
            }
            backgroundImage {
                gatsbyImageData(
                    layout: CONSTRAINED
                    width: 768
                    sizes: "(max-width: 560px) 360px, ((min-width: 560px) and (max-width: 1200px)) 600px, (min-width: 1200px) 50vw, 100vw"
                )
            }
            socialImage {
                gatsbyImageData(placeholder: NONE, layout: CONSTRAINED, width: 768)
            }
            updatedAt
        }
    }
`

export default FrontPage
