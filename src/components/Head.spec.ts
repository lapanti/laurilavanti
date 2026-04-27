import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Head from './Head.astro'

describe('<Head />', () => {
    it('should render with required props', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        expect(result).toBeDefined()
    })

    it('should set page title correctly', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const titleElement = result.querySelector('title')
        expect(titleElement?.textContent).toBe('Test Page | Lauri Lavanti')
    })

    it('should set base title when title is "Lauri Lavanti"', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Lauri Lavanti',
            },
        })

        const titleElement = result.querySelector('title')
        expect(titleElement?.textContent).toBe('Lauri Lavanti')
    })

    it('should set og:title meta tag', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const ogTitle = result.querySelector('meta[property="og:title"]')
        expect(ogTitle).toHaveAttribute('content', 'Test Page')
    })

    it('should set description meta tags', async () => {
        const description = 'Custom description'
        const result = await renderAstroComponent(Head, {
            props: {
                description,
                title: 'Test Page',
            },
        })

        const descMeta = result.querySelector('meta[name="description"]')
        const ogDescMeta = result.querySelector('meta[property="og:description"]')
        expect(descMeta).toHaveAttribute('content', description)
        expect(ogDescMeta).toHaveAttribute('content', description)
    })

    it('should include JSON-LD script tag', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        expect(jsonLdScript).toBeDefined()
    })

    it('should set BlogPosting JSON-LD when type is BLOGPOSTING', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-01-01',
                title: 'Test Blog Post',
                type: 'BlogPosting',
                updatedAt: '2024-01-02',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('BlogPosting')
        expect(jsonLd.datePublished).toBe('2024-01-01')
        expect(jsonLd.dateModified).toBe('2024-01-02')
    })

    it('should emit a secondary FAQPage JSON-LD script when faq has 2 or more entries', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                faq: [
                    { a: 'Answer one.', q: 'Question one?' },
                    { a: 'Answer two.', q: 'Question two?' },
                ],
                title: 'Test Blog Post',
                type: 'BlogPosting',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        expect(scripts).toHaveLength(2)

        const faqScript = Array.from(scripts).find((s) => {
            const parsed = JSON.parse(s.textContent || '{}')

            return parsed['@type'] === 'FAQPage'
        })
        expect(faqScript).toBeDefined()

        const faqJsonLd = JSON.parse(faqScript?.textContent || '{}')
        expect(faqJsonLd['@context']).toBe('https://schema.org')
        expect(faqJsonLd['@type']).toBe('FAQPage')
        expect(faqJsonLd.mainEntity).toHaveLength(2)
        expect(faqJsonLd.mainEntity[0]['@type']).toBe('Question')
        expect(faqJsonLd.mainEntity[0].name).toBe('Question one?')
        expect(faqJsonLd.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
        expect(faqJsonLd.mainEntity[0].acceptedAnswer.text).toBe('Answer one.')
    })

    it('should not emit a FAQPage JSON-LD script when faq has fewer than 2 entries', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                faq: [{ a: 'Answer one.', q: 'Question one?' }],
                title: 'Test Blog Post',
                type: 'BlogPosting',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        expect(scripts).toHaveLength(1)

        const faqScript = Array.from(scripts).find((s) => {
            const parsed = JSON.parse(s.textContent || '{}')

            return parsed['@type'] === 'FAQPage'
        })
        expect(faqScript).toBeUndefined()
    })

    it('should keep BlogPosting as primary JSON-LD type when faq is present', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2025-01-01',
                faq: [
                    { a: 'Answer one.', q: 'Question one?' },
                    { a: 'Answer two.', q: 'Question two?' },
                ],
                title: 'Test Blog Post',
                type: 'BlogPosting',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        const jsonLdItems = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'))

        const primarySchema = jsonLdItems.find((j) => j['@type'] === 'BlogPosting')
        expect(primarySchema).toBeDefined()
        expect(primarySchema?.datePublished).toBe('2025-01-01')

        const faqSchema = jsonLdItems.find((j) => j['@type'] === 'FAQPage')
        expect(faqSchema).toBeDefined()
    })

    it('should set author meta tag', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const authorMeta = result.querySelector('meta[name="author"]')
        expect(authorMeta).toHaveAttribute('content', 'Lauri Lavanti')
    })

    it('should set twitter card to summary when no image provided', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        const twitterCard = result.querySelector('meta[name="twitter:card"]')
        expect(twitterCard).toHaveAttribute('content', 'summary')
    })

    it('should not set canonical link when no slug provided', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Test Page',
            },
        })

        expect(result.querySelector('link[rel="canonical"]')).toBeNull()
        expect(result.querySelector('meta[property="og:url"]')).toBeNull()
    })

    it('should set WebSite JSON-LD when type is WebSite', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Home',
                type: 'WebSite',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('WebSite')
        expect(jsonLd.sameAs).toBeDefined()
    })

    it('should fall back dateModified to createdAt when updatedAt is absent', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-06-01',
                title: 'Blog post',
                type: 'BlogPosting',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd.dateModified).toBe('2024-06-01')
        expect(jsonLd.datePublished).toBe('2024-06-01')
    })

    it('should set Person JSON-LD when type is Person', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                lang: 'fi',
                title: 'Lauri Lavanti',
                type: 'Person',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('Person')
        expect(jsonLd.name).toBe('Lauri Lavanti')
        expect(jsonLd.jobTitle).toBe('Kunnanvaltuutettu ja johtava ohjelmistokehittäjä')
        expect(jsonLd.sameAs).toHaveLength(7)
        expect(jsonLd.memberOf['@type']).toBe('PoliticalParty')
        expect(jsonLd.memberOf.name).toBe('Vihreä liitto')
        expect(jsonLd.memberOf.url).toBe('https://www.vihreat.fi')
        expect(jsonLd.knowsAbout).toHaveLength(5)
    })

    it('should localise Person jobTitle for English', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                lang: 'en',
                title: 'Lauri Lavanti',
                type: 'Person',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd.jobTitle).toBe('Municipal councillor & Lead Developer')
    })

    it('should localise Person jobTitle for Swedish', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                lang: 'sv',
                title: 'Lauri Lavanti',
                type: 'Person',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd.jobTitle).toBe('Kommunfullmäktigeledamot och ledande mjukvarutvecklare')
    })

    it('should emit noindex robots meta tag when noindex is true', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                noindex: true,
                title: 'Hidden Page',
            },
        })

        const robotsMeta = result.querySelector('meta[name="robots"]')
        expect(robotsMeta).not.toBeNull()
        expect(robotsMeta).toHaveAttribute('content', 'noindex, nofollow')
    })

    it('should not emit robots meta tag when noindex is false', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Visible Page',
            },
        })

        expect(result.querySelector('meta[name="robots"]')).toBeNull()
    })

    it('should not emit canonical or hreflang links when noindex is true', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                noindex: true,
                slug: 'fi/recommendations',
                title: 'Hidden Page',
            },
        })

        expect(result.querySelector('link[rel="canonical"]')).toBeNull()
        expect(result.querySelector('link[rel="alternate"]')).toBeNull()
    })

    it('should accept langAlternates prop without error', async () => {
        const langAlternates = {
            en: '/en/blog/10/sote-is-the-cornerstone-of-the-welfare-society/',
            fi: '/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/',
            sv: '/sv/blog/10/sote-ar-valfardssallets-hordsten/',
        }

        const result = await renderAstroComponent(Head, {
            props: {
                lang: 'fi',
                langAlternates,
                noindex: true,
                title: 'Sote',
            },
        })

        expect(result).toBeDefined()
    })
})
