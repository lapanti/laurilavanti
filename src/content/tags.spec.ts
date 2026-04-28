import { describe, expect, it } from 'vitest'

import { getTagName, tags } from './tags'

const LOCALES = ['en', 'fi', 'sv'] as const
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/
// pageTitle with suffix '| Lauri Lavanti' (15 chars) must fit 50–60 chars total
const PAGE_TITLE_MIN = 34
const PAGE_TITLE_MAX = 44
// metaDescription is used directly as <meta name="description"> content
const META_DESCRIPTION_MAX = 160

describe('tags data', () => {
    it('should export a non-empty array', () => {
        expect(tags.length).toBeGreaterThan(0)
    })

    it('should have unique ids', () => {
        const ids = tags.map((t) => t.id)
        expect(new Set(ids).size).toBe(ids.length)
    })

    it.each(tags)('$id — id is kebab-case', ({ id }) => {
        expect(id).toMatch(KEBAB_CASE)
    })

    it.each(tags)('$id — names present in all locales', ({ id, names }) => {
        for (const locale of LOCALES) {
            expect(names[locale], `${id} names.${locale}`).toBeTruthy()
        }
    })

    it.each(tags)('$id — pageTitle present in all locales', ({ id, pageTitle }) => {
        for (const locale of LOCALES) {
            expect(pageTitle[locale], `${id} pageTitle.${locale}`).toBeTruthy()
        }
    })

    it.each(tags)('$id — pageTitle raw length within 34–44 chars per locale', ({ id, pageTitle }) => {
        for (const locale of LOCALES) {
            // Strip soft hyphens (U+00AD) — they are invisible and don't count toward displayed length
            const raw = pageTitle[locale].replace(/­/g, '')
            expect(raw.length, `${id} pageTitle.${locale} length ${raw.length}`).toBeGreaterThanOrEqual(PAGE_TITLE_MIN)
            expect(raw.length, `${id} pageTitle.${locale} length ${raw.length}`).toBeLessThanOrEqual(PAGE_TITLE_MAX)
        }
    })

    it.each(tags)('$id — metaDescription present in all locales', ({ id, metaDescription }) => {
        for (const locale of LOCALES) {
            expect(metaDescription[locale], `${id} metaDescription.${locale}`).toBeTruthy()
        }
    })

    it.each(tags)('$id — metaDescription ≤ 160 chars per locale', ({ id, metaDescription }) => {
        for (const locale of LOCALES) {
            expect(
                metaDescription[locale].length,
                `${id} metaDescription.${locale} is ${metaDescription[locale].length} chars (max ${META_DESCRIPTION_MAX})`
            ).toBeLessThanOrEqual(META_DESCRIPTION_MAX)
        }
    })

    it.each(tags)('$id — descriptions present in all locales', ({ id, descriptions }) => {
        for (const locale of LOCALES) {
            expect(descriptions[locale].length, `${id} descriptions.${locale} array is empty`).toBeGreaterThan(0)
            expect(descriptions[locale][0], `${id} descriptions.${locale}[0]`).toBeTruthy()
        }
    })

    it.each(tags.filter((t) => t.heroImage))(
        '$id — heroImage requires heroImageAlt in all locales',
        ({ id, heroImageAlt }) => {
            expect(heroImageAlt, `${id} heroImageAlt must be set when heroImage is set`).toBeDefined()
            for (const locale of LOCALES) {
                expect(heroImageAlt![locale], `${id} heroImageAlt.${locale}`).toBeTruthy()
            }
        }
    )

    it.each(tags.filter((t) => t.faq))('$id — faq locale arrays, when present, have ≥ 2 entries', ({ id, faq }) => {
        for (const locale of LOCALES) {
            const entries = faq![locale] ?? []
            expect(
                entries.length === 0 || entries.length >= 2,
                `${id} faq.${locale} has ${entries.length} entries — need 0 or ≥ 2 to render FAQPage JSON-LD`
            ).toBe(true)
        }
    })

    it.each(tags.filter((t) => t.faq))('$id — faq entries have non-empty q and a', ({ id, faq }) => {
        for (const locale of LOCALES) {
            const entries = faq![locale] ?? []
            for (const [i, entry] of entries.entries()) {
                expect(entry.q, `${id} faq.${locale}[${i}].q`).toBeTruthy()
                expect(entry.a, `${id} faq.${locale}[${i}].a`).toBeTruthy()
            }
        }
    })
})

describe('getTagName', () => {
    it('returns fi name for known id (default locale)', () => {
        expect(getTagName('kirkkonummi')).toBe('Kirkkonummi')
    })

    it('returns en name for known id with locale argument', () => {
        expect(getTagName('kirkkonummi', 'en')).toBe('Kirkkonummi')
    })

    it('returns sv name for known id with sv locale', () => {
        expect(getTagName('digital-independence', 'sv')).toBe('Digital självständighet')
    })

    it('returns undefined for unknown id', () => {
        expect(getTagName('non-existent-tag')).toBeUndefined()
    })
})
