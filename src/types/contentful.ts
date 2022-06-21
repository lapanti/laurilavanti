import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { JsonLdType } from './jsonld'

interface RichTextPostReference extends ContentfulRichTextGatsbyReference {
    slug: string
}

interface RichTextImageReference extends ContentfulRichTextGatsbyReference {
    caption: string
    altText: string
    image: {
        localFile: ImageDataLike
    }
}

export interface ContactInfoLink {
    contentful_id: string
    title: string
    url?: string | null
    icon: 'facebook' | 'twitter' | 'linkedin' | 'envelope'
}

interface ContactInfoReference extends ContentfulRichTextGatsbyReference {
    links: ContactInfoLink[]
}

type RichReferences = RichTextPostReference | RichTextImageReference | ContactInfoReference

export type RichBody = RenderRichTextData<RichReferences>

export interface ContentfulPage {
    description: string | null
    hideTitle: boolean
    jsonLdType: JsonLdType
    title: string
    body: RichBody
    metaImage?: {
        localFile: ImageDataLike
    }
    image?: {
        localFile: ImageDataLike
    }
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
    headerImage: {
        localFile: ImageDataLike
    }
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

export interface MainNav {
    links: {
        contentful_id: string
        title: string
        slug: string
    }[]
}

export interface FooterNav {
    links: {
        contentful_id: string
        title: string
        url: string
        icon: 'facebook' | 'twitter' | 'linkedin'
    }[]
}
