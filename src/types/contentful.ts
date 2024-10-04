import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { JsonLdType } from './jsonld'

interface ExcerptListReference extends ContentfulRichTextGatsbyReference {
    limit: number
    pinned?: { slug: string }[]
}

interface RichTextPostReference extends ContentfulRichTextGatsbyReference {
    slug: string
}

interface RichTextImageReference extends ContentfulRichTextGatsbyReference {
    caption: string
    altText: string
    image: {
        localFile: ImageDataLike
        description: string
    }
}

export interface ContactInfoLink {
    contentful_id: string
    title: string
    url?: string | null
    icon: 'facebook' | 'bluesky' | 'instagram' | 'linkedin' | 'mastodon' | 'envelope' | 'threads'
}

export interface Fiduciary {
    duty: string
    organization: string
    startYear: number
    endYear?: number
}

export interface JobExperience {
    title: string
    company: string
    location: string
    startYear: number
    endYear?: number
}

export interface Degree {
    degree: string
    school: string
    location: string
    startYear: number
    endYear?: number
}

interface CurriculumVitae extends ContentfulRichTextGatsbyReference {
    fiduciariesTitle: string
    fiduciaries: Fiduciary[]
    degreesTitle: string
    degrees: Degree[]
    jobExperiencesTitle: string
    jobExperiences: JobExperience[]
}

interface ContactInfoReference extends ContentfulRichTextGatsbyReference {
    links: ContactInfoLink[]
}

interface YearsFromReference extends ContentfulRichTextGatsbyReference {
    dateToCountFrom?: string // In the format 'yyyy-MM-dd'
}

type RichReferences =
    | ExcerptListReference
    | RichTextPostReference
    | RichTextImageReference
    | ContactInfoReference
    | ContentfulRichTextGatsbyReference
    | CurriculumVitae
    | YearsFromReference

export type RichBody = RenderRichTextData<RichReferences>

export interface ContentfulPage {
    description: string | null
    jsonLdType: JsonLdType
    title: string
    subtitle: string | null
    secondaryTitle: string | null
    body: RichBody
    image: {
        localFile: ImageDataLike
        description: string
    }
    mobileImage?: {
        localFile: ImageDataLike
        description: string
    } | null
    socialImage: {
        localFile: ImageDataLike
    } | null
    backgroundImage: {
        localFile: ImageDataLike
    } | null
    updatedAt: string
    leftAlignedTitle: boolean
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
        description: string
    }
    excerptImage?: {
        localFile: ImageDataLike
        description: string
    } | null
    excerpt: string
    leftAlignedTitle: boolean
}

export interface ContentfulPostExcerpt extends ContentfulPostCommon {
    slug: string
}

export interface ContentfulPost extends ContentfulPostCommon {
    body: RichBody
    updatedAt: string
    publishedOld: string | null
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
    links: ContactInfoLink[]
}
