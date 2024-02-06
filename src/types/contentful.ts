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

interface Image {
    localFile: ImageDataLike
    description: string
}

type Tag = Pick<Queries.ContentfulTag, 'contentful_id'>

interface Metadata {
    tags: Tag[]
}

type ContentfulPostCommon = Pick<Queries.ContentfulPost, 'title' | 'createdAt' | 'publishDate' | 'excerpt'> & {
    metadata: Metadata
    headerImage: Image
    mobileHeaderImage: Image
}

export type ContentfulPostExcerpt = ContentfulPostCommon & Pick<Queries.ContentfulPost, 'slug'>

export type ContentfulPost = ContentfulPostCommon &
    Pick<Queries.ContentfulPost, 'updatedAt'> & { body: RichBody; publishedOld?: string | null; published: string }

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
