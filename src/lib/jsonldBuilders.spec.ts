import { describe, expect, it } from 'vitest'

import { BLOGPOSTING, COLLECTIONPAGE, PERSON, PROFILEPAGE, WEBPAGE, WEBSITE } from './jsonld'
import { buildPrimaryJsonLd, type PrimaryJsonLdInput, resolvePrimaryJsonLdType } from './jsonldBuilders'

const person = {
    '@id': 'https://lavanti.fi/#lauri-lavanti',
    '@type': PERSON,
    affiliation: [{ '@type': 'Organization', name: 'Initiative', url: 'https://example.com/initiative' }],
    alumniOf: [{ '@type': 'EducationalOrganization', name: 'University', url: 'https://example.com/university' }],
    birthDate: '1991-10-01',
    birthPlace: { '@type': 'Place', name: 'Jyväskylä' },
    description: 'Person description',
    email: 'lauri@lavanti.fi',
    familyName: 'Lavanti',
    givenName: 'Lauri',
    hasOccupation: [{ '@type': 'Occupation', name: 'Developer' }],
    image: 'https://example.com/person.jpg',
    jobTitle: 'Developer',
    knowsAbout: ['Technology'],
    knowsLanguage: ['fi', 'en', 'sv'],
    memberOf: { '@type': 'PoliticalParty', name: 'Party', url: 'https://example.com/party' },
    name: 'Lauri Lavanti',
    nationality: { '@type': 'Country', name: 'FI' },
    sameAs: ['https://example.com/profile'],
    telephone: '+358401234567',
    url: 'https://lavanti.fi/fi/',
    worksFor: { '@type': 'Organization', name: 'Employer', url: 'https://example.com/employer' },
}

const input: PrimaryJsonLdInput = {
    authors: [{ '@id': person['@id'], '@type': PERSON }],
    canonical: 'https://lavanti.fi/fi/example/',
    createdAt: '2026-01-01',
    description: 'Page description',
    lang: 'fi',
    ogImage: 'https://example.com/page.jpg',
    person,
    tags: ['technology'],
    title: 'Page title',
    updatedAt: '2026-02-01',
    wordCount: 850,
}

const keys = (value: Record<string, unknown>) => Object.keys(value).sort()

describe('resolvePrimaryJsonLdType', () => {
    it('falls back to WebSite for missing and unsupported types', () => {
        expect(resolvePrimaryJsonLdType()).toBe(WEBSITE)
        expect(resolvePrimaryJsonLdType('Unsupported')).toBe(WEBSITE)
    })
})

describe('buildPrimaryJsonLd', () => {
    it('builds only BlogPosting fields', () => {
        const schema = buildPrimaryJsonLd({ ...input, type: BLOGPOSTING })

        expect(keys(schema)).toEqual(
            [
                '@context',
                '@type',
                'author',
                'dateModified',
                'datePublished',
                'description',
                'headline',
                'image',
                'inLanguage',
                'keywords',
                'license',
                'mainEntityOfPage',
                'primaryImageOfPage',
                'url',
                'wordCount',
            ].sort()
        )
        expect(schema.image).toEqual({ '@type': 'ImageObject', height: 630, url: input.ogImage, width: 1200 })
        expect(schema).not.toHaveProperty('name')
        expect(schema).not.toHaveProperty('sameAs')
    })

    it('builds only ProfilePage fields', () => {
        const schema = buildPrimaryJsonLd({ ...input, type: PROFILEPAGE })

        expect(keys(schema)).toEqual(
            [
                '@context',
                '@type',
                'dateModified',
                'description',
                'image',
                'inLanguage',
                'mainEntity',
                'name',
                'url',
            ].sort()
        )
        expect(schema.mainEntity).toBe(person)
        expect(schema).not.toHaveProperty('author')
        expect(schema).not.toHaveProperty('headline')
        expect(schema).not.toHaveProperty('license')
    })

    it('builds only canonical Person fields', () => {
        const schema = buildPrimaryJsonLd({ ...input, type: PERSON })

        expect(keys(schema)).toEqual(keys({ '@context': 'https://schema.org', ...person }))
        expect(schema.url).toBe(person.url)
        expect(schema).not.toHaveProperty('author')
        expect(schema).not.toHaveProperty('headline')
        expect(schema).not.toHaveProperty('license')
    })

    it.each([
        [COLLECTIONPAGE, ['@context', '@type', 'description', 'image', 'inLanguage', 'name', 'url']],
        [WEBPAGE, ['@context', '@type', 'dateModified', 'description', 'image', 'inLanguage', 'name', 'url']],
        [WEBSITE, ['@context', '@type', 'description', 'image', 'inLanguage', 'name', 'sameAs', 'url']],
    ] as const)('builds only %s fields', (type, expectedKeys) => {
        const schema = buildPrimaryJsonLd({ ...input, type })

        expect(keys(schema)).toEqual([...expectedKeys].sort())
        expect(schema).not.toHaveProperty('author')
        expect(schema).not.toHaveProperty('headline')
        expect(schema).not.toHaveProperty('license')
    })

    it('omits unavailable URLs and null values', () => {
        const schema = buildPrimaryJsonLd({ ...input, canonical: undefined, ogImage: undefined, type: BLOGPOSTING })
        const serialized = JSON.stringify(schema)

        expect(schema).not.toHaveProperty('url')
        expect(schema).not.toHaveProperty('mainEntityOfPage')
        expect(serialized).not.toContain('null')
    })
})
