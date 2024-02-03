import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text'
import type { JsonLdType } from './jsonld'

interface ExcerptListReference extends ContentfulRichTextGatsbyReference {
    limit: number
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

export type ContactInfoLink = Pick<Queries.ContentfulContactInfoLink, 'contentful_id' | 'title' | 'url' | 'icon'>

export type Fiduciary = Pick<Queries.ContentfulFiduciaries, 'duty' | 'organization' | 'startYear' | 'endYear'>

export type JobExperience = Pick<
    Queries.ContentfulJobExperience,
    'title' | 'company' | 'location' | 'startYear' | 'endYear'
>

export type Education = Pick<Queries.ContentfulEducation, 'degree' | 'school' | 'location' | 'startYear' | 'endYear'>

interface CurriculumVitae extends ContentfulRichTextGatsbyReference {
    fiduciariesTitle: string
    fiduciaries: Fiduciary[]
    degreesTitle: string
    degrees: Education[]
    jobExperiencesTitle: string
    jobExperiences: JobExperience[]
}

interface ContactInfoReference extends ContentfulRichTextGatsbyReference {
    links: ContactInfoLink[]
}

type RichReferences =
    | ExcerptListReference
    | RichTextPostReference
    | RichTextImageReference
    | ContactInfoReference
    | ContentfulRichTextGatsbyReference
    | CurriculumVitae

export type RichBody = RenderRichTextData<RichReferences>

export interface ContentfulPage {
    description: string | null
    hideTitle: boolean
    jsonLdType: JsonLdType
    title: string
    body: RichBody
    image: {
        localFile: ImageDataLike
        description: string
    }
    mobileImage: {
        localFile: ImageDataLike
        description: string
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
        description: string
    }
    mobileHeaderImage: {
        localFile: ImageDataLike
        description: string
    }
    excerpt: string
}

interface Image {
    localFile: ImageDataLike
    description: string
}

type Tag = Pick<Queries.ContentfulTag, 'contentful_id'>

interface Metadata {
    tags: Tag[]
}

export type ContentfulPostExcerpt = Pick<
    Queries.ContentfulPost,
    'title' | 'createdAt' | 'publishDate' | 'excerpt' | 'slug'
> & { headerImage: Image; mobileHeaderImage: Image; metadata: Metadata }

export interface ContentfulPost extends ContentfulPostCommon {
    body: RichBody
    updatedAt: string
    publishedOld: string | null
    published: string
}

export type MainNavLink = NonNullable<
    NonNullable<NonNullable<Queries.HeaderQuery['contentfulMainNav']>['links']>[number]
>

export interface MainNavQuery {
    contentfulMainNav: {
        links: MainNavLink[]
    }
}

export interface FooterNav {
    links: ContactInfoLink[]
}
