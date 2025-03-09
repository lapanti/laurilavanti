import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'

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
                            __typename
                            contentful_id
                            backgroundImage {
                                gatsbyImageData(
                                    layout: CONSTRAINED
                                    width: 560
                                    sizes: "(min-width: 560px) 560px, 100vw"
                                )
                                description
                            }
                            image {
                                gatsbyImageData(
                                    layout: CONSTRAINED
                                    width: 560
                                    sizes: "(min-width: 560px) 560px, 100vw"
                                )
                                description
                            }
                            title
                            description
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
                gatsbyImageData(
                    placeholder: NONE
                    layout: CONSTRAINED
                    width: 768
                    sizes: "(min-width: 768px) 768px, (min-width: 1200px): 50vw, 100vw"
                )
                description
            }
            backgroundImage {
                gatsbyImageData(
                    placeholder: NONE
                    layout: CONSTRAINED
                    width: 768
                    sizes: "(min-width: 768px) 768px, (min-width: 1200px): 50vw, 100vw"
                )
            }
            socialImage {
                gatsbyImageData(
                    placeholder: NONE
                    layout: CONSTRAINED
                    jpegProgressive: false
                    quality: 100
                    width: 1120
                )
            }
            updatedAt
            leftAlignedTitle
        }
    }
`

export default Page
