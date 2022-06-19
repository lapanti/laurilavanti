import type { Block, Inline } from '@contentful/rich-text-types'
import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { ReactNode } from 'react'
import type { JsonLdType } from '../types/jsonld'

import { BLOCKS } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import tw from 'twin.macro'

import ContactInfo from './ContactInfo'
import ExcerptList from './ExcerptList'
import H2 from './H2'
import HomeTitle from './HomeTitle'
import HR from './HR'
import Image from './Image'
import Layout from './Layout'
import Paragraph from './Paragraph'

const PositionedP = tw(Paragraph)`
    col-start-3
`

const options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_, children: ReactNode) => <PositionedP>{children}</PositionedP>,
        [BLOCKS.HEADING_2]: (_, children: ReactNode) => <H2>{children}</H2>,
        [BLOCKS.HR]: () => <HR />,
        [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
            console.log('node', node)
            switch (node.data.target.__typename) {
                case 'ContentfulHomeTitle':
                    return <HomeTitle />
                case 'ContentfulExcerptList':
                    return <ExcerptList limit={node.data.target.limit} />
                case 'ContentfulImageWithCaption':
                    return (
                        <Image
                            imageData={node.data.target.image}
                            alt={node.data.target.altText}
                            caption={node.data.target.caption}
                        />
                    )
                case 'ContentfulContactInfo':
                    return <ContactInfo />
            }
        },
    },
}

interface Props {
    data: {
        contentfulPage: {
            description: string | null
            hideTitle: boolean
            jsonLdType: JsonLdType
            title: string
            body: RenderRichTextData<ContentfulRichTextGatsbyReference>
            metaImage?: ImageDataLike
            image?: ImageDataLike
            updatedAt: string
        }
    }
    pageContext: {
        slug: string
    }
}

const Page = ({
    data: {
        contentfulPage: { description, hideTitle, jsonLdType, title, body, metaImage, image, updatedAt },
    },
    pageContext: { slug },
}: Props): JSX.Element => (
    <Layout
        title={hideTitle ? undefined : title}
        hiddenTitle={hideTitle ? title : undefined}
        pathname={`/${slug}`}
        heroImage={image}
        metaImage={metaImage}
        description={description || ''}
        type={jsonLdType}
        modified={updatedAt}
    >
        {renderRichText(body, options)}
    </Layout>
)

export const query = graphql`
    query ($slug: String!) {
        contentfulPage(slug: { eq: $slug }) {
            description
            hideTitle
            jsonLdType
            title
            body {
                raw
                references {
                    ... on ContentfulContactInfo {
                        __typename
                        contentful_id
                    }
                    ... on ContentfulHomeTitle {
                        __typename
                        contentful_id
                    }
                    ... on ContentfulImageWithCaption {
                        __typename
                        contentful_id
                        altText
                        image {
                            gatsbyImageData
                        }
                        caption
                    }
                    ... on ContentfulExcerptList {
                        __typename
                        contentful_id
                        limit
                    }
                }
            }
            metaImage {
                gatsbyImageData
            }
            image {
                gatsbyImageData(placeholder: BLURRED)
            }
            updatedAt
        }
    }
`

export default Page
