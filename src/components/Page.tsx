import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'
import { useEffect } from 'react'

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

const Page = ({ data, pageContext: { slug } }: Props): JSX.Element => {
    useEffect(() => {
        const redirect = async () => {
            window.location.replace(
                'https://vaalit.vihreat.fi/embed/ehdokas/?kieli=fi&vaali=kuntavaalit-2025&kunta=k257&ehdokas=lavanti-lauri-7479&valilehti=donate'
            )
        }
        if (slug === 'lahjoita') {
            redirect()
        }
    }, [slug])

    return (
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
}

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
                gatsbyImageData(placeholder: NONE, layout: CONSTRAINED, width: 560)
            }
            updatedAt
            leftAlignedTitle
        }
    }
`

export default Page
