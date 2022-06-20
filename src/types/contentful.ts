import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { JsonLdType } from './jsonld'

interface RichTextPostReference extends ContentfulRichTextGatsbyReference {
    slug: string
}

interface RichTextImageReference extends ContentfulRichTextGatsbyReference {
    caption: string
    altText: string
    image: ImageDataLike
}

type RichReferences = RichTextPostReference | RichTextImageReference

export type RichBody = RenderRichTextData<RichReferences>

export interface ContentfulPage {
    description: string | null
    hideTitle: boolean
    jsonLdType: JsonLdType
    title: string
    body: RichBody
    metaImage?: ImageDataLike
    image?: ImageDataLike
    updatedAt: string
}

interface ContentfulPostCommon {
    title: string
    createdAt: string
    publishDate?: string | null
    metadata: {
        tags: {
            contentful_id: string
        }[]
    }
    headerImage: ImageDataLike
    excerpt: string
}

export interface ContentfulPostExcerpt extends ContentfulPostCommon {
    slug: string
}

export interface ContentfulPost extends ContentfulPostCommon {
    body: RichBody
    updatedAt: string
    publishedOld: string
    published: string
}
