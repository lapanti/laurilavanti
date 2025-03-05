import type { IGatsbyImageData } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { JsonLdType } from './jsonld'

interface ExcerptListReference extends ContentfulRichTextGatsbyReference {
    limit: number
    pinned?: { slug: string }[]
}

interface RichTextPostReference extends ContentfulRichTextGatsbyReference {
    slug: string
}

interface ImageWithCaptionReference extends ContentfulRichTextGatsbyReference {
    caption: string
    image: {
        gatsbyImageData: IGatsbyImageData
        description: string
    }
}

interface ImageReference extends ContentfulRichTextGatsbyReference {
    description: string
    gatsbyImageData: IGatsbyImageData
}

export interface ContactInfoLink {
    contentful_id: string
    title: string
    url: string
    icon: 'facebook' | 'bluesky' | 'instagram' | 'linkedin' | 'envelope' | 'threads'
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

interface ContactInfoLinkReference extends ContentfulRichTextGatsbyReference {
    title: string
    url?: string | null
    icon: 'facebook' | 'bluesky' | 'instagram' | 'linkedin' | 'envelope' | 'threads'
}

interface YearsFromReference extends ContentfulRichTextGatsbyReference {
    dateToCountFrom?: string // In the format 'yyyy-MM-dd'
}

type RichReferences =
    | ExcerptListReference
    | RichTextPostReference
    | ImageWithCaptionReference
    | ContactInfoLinkReference
    | ContentfulRichTextGatsbyReference
    | CurriculumVitae
    | YearsFromReference
    | ImageReference

export type RichBody = RenderRichTextData<RichReferences>

export interface ContentfulPage {
    description: string | null
    jsonLdType: JsonLdType
    title: string
    subtitle: string | null
    secondaryTitle: string | null
    body: RichBody
    image: {
        gatsbyImageData: IGatsbyImageData
        description: string
    }
    socialImage: {
        gatsbyImageData: IGatsbyImageData
    } | null
    backgroundImage: {
        gatsbyImageData: IGatsbyImageData
        description: string
    } | null
    updatedAt: string
    leftAlignedTitle: boolean
    slug: string
}

export type ContentfulPinnedPage = Pick<ContentfulPage, 'description' | 'title' | 'backgroundImage' | 'slug'>

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
        gatsbyImageData: IGatsbyImageData
        description: string
    }
    backgroundImage?: {
        gatsbyImageData: IGatsbyImageData
        description: string
    } | null
    socialImage?: {
        gatsbyImageData: IGatsbyImageData
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
        navigationTitle?: string
        slug: string
    }[]
}

export interface FooterNav {
    links: ContactInfoLink[]
}
