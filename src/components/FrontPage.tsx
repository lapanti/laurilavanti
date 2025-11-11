import type { ContentfulPage } from '../types/contentful'

import { graphql } from 'gatsby'

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
    />
)

export const query = graphql`
    query ($slug: String!) {
        contentfulPage(slug: { eq: $slug }) {
            description
            jsonLdType
            title
            secondaryTitle
            subtitle
            body {
                raw
                references {
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
                    sizes: "(min-width: 1200px) 560px, 360px"
                )
                description
            }
            backgroundImage {
                gatsbyImageData(placeholder: NONE, layout: CONSTRAINED, width: 768, sizes: "50vw")
            }
            socialImage {
                gatsbyImageData(
                    placeholder: NONE
                    layout: CONSTRAINED
                    jpegProgressive: false
                    quality: 100
                    width: 1120
                    height: 582
                )
            }
            updatedAt
        }
    }
`

export default FrontPage
