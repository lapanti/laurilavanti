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
        title={data?.contentfulPage?.title}
        subtitle={data?.contentfulPage?.subtitle ?? undefined}
        secondaryTitle={data?.contentfulPage?.secondaryTitle ?? undefined}
        pathname={`/${slug}/`}
        heroImage={data?.contentfulPage?.image?.localFile}
        heroImageAlt={data?.contentfulPage?.image?.description}
        mobileHeroImage={data?.contentfulPage?.mobileImage?.localFile}
        mobileHeroImageAlt={data?.contentfulPage?.mobileImage?.description}
        backgroundImage={data?.contentfulPage?.backgroundImage?.localFile}
        description={data?.contentfulPage?.description ?? ''}
        type={data?.contentfulPage?.jsonLdType}
        modified={data?.contentfulPage?.updatedAt}
        body={data?.contentfulPage?.body}
        isFrontPage
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
                }
            }
            image {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FIXED
                            height: 667
                            width: 1920
                            transformOptions: { fit: OUTSIDE }
                        )
                    }
                }
                description
            }
            mobileImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FIXED
                            height: 667
                            width: 478
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
                            layout: FIXED
                            height: 667
                            width: 1920
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
