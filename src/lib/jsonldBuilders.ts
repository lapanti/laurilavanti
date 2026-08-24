import type { Lang } from '../content/nav'
import type { JsonLdType } from './jsonld'

import { BLOGPOSTING, COLLECTIONPAGE, JSON_LD_TYPES, PERSON, PROFILEPAGE, WEBPAGE, WEBSITE } from './jsonld'

type JsonLdObject = Record<string, unknown>

export interface PrimaryJsonLdInput {
    authors?: JsonLdObject[]
    canonical?: string
    createdAt?: string
    description: string
    lang: Lang
    ogImage?: string
    person: JsonLdObject
    tags?: string[]
    title: string
    type?: string
    updatedAt?: string
    wordCount?: number
}

const SCHEMA_CONTEXT = 'https://schema.org'
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/'
const primaryTypes = new Set<string>(JSON_LD_TYPES)

const imageObject = (url: string) => ({ '@type': 'ImageObject', height: 630, url, width: 1200 })

export const resolvePrimaryJsonLdType = (type?: string): JsonLdType =>
    type && primaryTypes.has(type) ? (type as JsonLdType) : WEBSITE

export const buildPrimaryJsonLd = ({
    authors = [],
    canonical,
    createdAt,
    description,
    lang,
    ogImage,
    person,
    tags,
    title,
    type,
    updatedAt,
    wordCount,
}: PrimaryJsonLdInput): JsonLdObject => {
    const resolvedType = resolvePrimaryJsonLdType(type)
    const base = { '@context': SCHEMA_CONTEXT, '@type': resolvedType }
    const pageFields = {
        description,
        inLanguage: lang,
        name: title,
        ...(canonical ? { url: canonical } : {}),
        ...(ogImage ? { image: ogImage } : {}),
    }

    switch (resolvedType) {
        case BLOGPOSTING:
            return {
                ...base,
                author: authors,
                ...((updatedAt ?? createdAt) ? { dateModified: updatedAt ?? createdAt } : {}),
                ...(createdAt ? { datePublished: createdAt } : {}),
                description,
                headline: title,
                inLanguage: lang,
                license: LICENSE_URL,
                ...(canonical
                    ? {
                          mainEntityOfPage: {
                              '@id': canonical,
                              '@type': WEBPAGE,
                              inLanguage: lang,
                          },
                          url: canonical,
                      }
                    : {}),
                ...(ogImage
                    ? {
                          image: imageObject(ogImage),
                          primaryImageOfPage: imageObject(ogImage),
                      }
                    : {}),
                ...(tags?.length ? { keywords: tags } : {}),
                ...(wordCount !== undefined ? { wordCount } : {}),
            }
        case PROFILEPAGE:
            return {
                ...base,
                ...pageFields,
                ...(updatedAt ? { dateModified: updatedAt } : {}),
                mainEntity: person,
            }
        case PERSON:
            return {
                ...base,
                ...person,
                '@type': PERSON,
            }
        case COLLECTIONPAGE:
            return { ...base, ...pageFields }
        case WEBPAGE:
            return {
                ...base,
                ...pageFields,
                ...(updatedAt ? { dateModified: updatedAt } : {}),
            }
        case WEBSITE:
            return {
                ...base,
                ...pageFields,
                sameAs: person.sameAs,
            }
    }
}
