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

    it('should emit article:modified_time meta when BlogPosting has updatedAt', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-01-01',
                title: 'Blog post',
                type: 'BlogPosting',
                updatedAt: '2024-06-01',
            },
        })

        const meta = result.querySelector('meta[property="article:modified_time"]')
        expect(meta).toBeDefined()
        expect(meta?.getAttribute('content')).toBe('2024-06-01')
    })

    it('should not emit article:modified_time meta when BlogPosting has no updatedAt', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-01-01',
                title: 'Blog post',
                type: 'BlogPosting',
            },
        })

        const meta = result.querySelector('meta[property="article:modified_time"]')
        expect(meta).toBeNull()
    })

    it('should not emit article:modified_time meta for non-article pages', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Some page',
                updatedAt: '2024-06-01',
            },
        })

        const meta = result.querySelector('meta[property="article:modified_time"]')
        expect(meta).toBeNull()
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
        expect(jsonLd.knowsAbout).toHaveLength(9)
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

    it('should emit two og:locale:alternate tags for fi page (en_GB, sv_SE)', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                lang: 'fi',
                title: 'Blogi',
            },
        })

        const alts = Array.from(result.querySelectorAll('meta[property="og:locale:alternate"]'))
        expect(alts).toHaveLength(2)
        const contents = alts.map((el) => el.getAttribute('content'))
        expect(contents).toContain('en_GB')
        expect(contents).toContain('sv_SE')
        expect(contents).not.toContain('fi_FI')
    })

    it('should emit two og:locale:alternate tags for en page (fi_FI, sv_SE)', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                lang: 'en',
                title: 'Blog',
            },
        })

        const alts = Array.from(result.querySelectorAll('meta[property="og:locale:alternate"]'))
        expect(alts).toHaveLength(2)
        const contents = alts.map((el) => el.getAttribute('content'))
        expect(contents).toContain('fi_FI')
        expect(contents).toContain('sv_SE')
        expect(contents).not.toContain('en_GB')
    })

    it('should not emit og:locale:alternate tags when noindex is true', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                lang: 'fi',
                noindex: true,
                title: 'Hidden Page',
            },
        })

        const alts = result.querySelectorAll('meta[property="og:locale:alternate"]')
        expect(alts).toHaveLength(0)
    })

    it('should emit BreadcrumbList JSON-LD for a blog post (3 items)', async () => {
        const breadcrumbs = [
            { name: 'Etusivu', url: 'https://laurilavanti.fi/fi/' },
            { name: 'Blogi', url: 'https://laurilavanti.fi/fi/blog/' },
            { name: 'Testijulkaisu', url: 'https://laurilavanti.fi/fi/blog/1/testijulkaisu/' },
        ]

        const result = await renderAstroComponent(Head, {
            props: {
                breadcrumbs,
                title: 'Testijulkaisu',
                type: 'BlogPosting',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        const jsonLdItems = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'))

        const breadcrumbSchema = jsonLdItems.find((j) => j['@type'] === 'BreadcrumbList')
        expect(breadcrumbSchema).toBeDefined()
        expect(breadcrumbSchema?.['@context']).toBe('https://schema.org')
        expect(breadcrumbSchema?.itemListElement).toHaveLength(3)
        expect(breadcrumbSchema?.itemListElement[0]).toEqual({
            '@type': 'ListItem',
            item: 'https://laurilavanti.fi/fi/',
            name: 'Etusivu',
            position: 1,
        })
        expect(breadcrumbSchema?.itemListElement[1]).toEqual({
            '@type': 'ListItem',
            item: 'https://laurilavanti.fi/fi/blog/',
            name: 'Blogi',
            position: 2,
        })
        expect(breadcrumbSchema?.itemListElement[2]).toEqual({
            '@type': 'ListItem',
            item: 'https://laurilavanti.fi/fi/blog/1/testijulkaisu/',
            name: 'Testijulkaisu',
            position: 3,
        })
    })

    it('should emit BreadcrumbList JSON-LD for a tag page (2 items)', async () => {
        const breadcrumbs = [
            { name: 'Etusivu', url: 'https://laurilavanti.fi/fi/' },
            { name: 'Kategoria', url: 'https://laurilavanti.fi/fi/category/tekoaly/' },
        ]

        const result = await renderAstroComponent(Head, {
            props: {
                breadcrumbs,
                title: 'Tekoäly',
                type: 'CollectionPage',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        const jsonLdItems = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'))

        const breadcrumbSchema = jsonLdItems.find((j) => j['@type'] === 'BreadcrumbList')
        expect(breadcrumbSchema).toBeDefined()
        expect(breadcrumbSchema?.itemListElement).toHaveLength(2)
        expect(breadcrumbSchema?.itemListElement[0].position).toBe(1)
        expect(breadcrumbSchema?.itemListElement[1].position).toBe(2)
    })

    it('should not emit BreadcrumbList when breadcrumbs prop is absent', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'No breadcrumbs',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        const jsonLdItems = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'))
        const breadcrumbSchema = jsonLdItems.find((j) => j['@type'] === 'BreadcrumbList')
        expect(breadcrumbSchema).toBeUndefined()
    })

    it('should not emit BreadcrumbList when breadcrumbs has fewer than 2 items', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                breadcrumbs: [{ name: 'Etusivu', url: 'https://laurilavanti.fi/fi/' }],
                title: 'Single breadcrumb',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        const jsonLdItems = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'))
        const breadcrumbSchema = jsonLdItems.find((j) => j['@type'] === 'BreadcrumbList')
        expect(breadcrumbSchema).toBeUndefined()
    })

    it('should localise BreadcrumbList labels correctly for English', async () => {
        const breadcrumbs = [
            { name: 'Home', url: 'https://laurilavanti.fi/en/' },
            { name: 'Blog', url: 'https://laurilavanti.fi/en/blog/' },
            { name: 'Test post', url: 'https://laurilavanti.fi/en/blog/1/test-post/' },
        ]

        const result = await renderAstroComponent(Head, {
            props: {
                breadcrumbs,
                lang: 'en',
                title: 'Test post',
                type: 'BlogPosting',
            },
        })

        const scripts = result.querySelectorAll('script[type="application/ld+json"]')
        const jsonLdItems = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'))
        const breadcrumbSchema = jsonLdItems.find((j) => j['@type'] === 'BreadcrumbList')
        expect(breadcrumbSchema?.itemListElement[0].name).toBe('Home')
        expect(breadcrumbSchema?.itemListElement[1].name).toBe('Blog')
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

    it('should emit ImageObject for image and primaryImageOfPage in BlogPosting JSON-LD when ogImage is set', async () => {
        const ogImage = 'https://res.cloudinary.com/example/image/upload/v1/test.jpg'
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-01-01',
                ogImage,
                title: 'Test Blog Post',
                type: 'BlogPosting',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('BlogPosting')
        expect(jsonLd.image['@type']).toBe('ImageObject')
        expect(jsonLd.image.url).toBe(ogImage)
        expect(jsonLd.image.width).toBe(1200)
        expect(jsonLd.image.height).toBe(630)
        expect(jsonLd.primaryImageOfPage['@type']).toBe('ImageObject')
        expect(jsonLd.primaryImageOfPage.url).toBe(ogImage)
        expect(jsonLd.primaryImageOfPage.width).toBe(1200)
        expect(jsonLd.primaryImageOfPage.height).toBe(630)
    })

    it('should not emit image or primaryImageOfPage in BlogPosting JSON-LD when ogImage is absent', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-01-01',
                title: 'Test Blog Post',
                type: 'BlogPosting',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('BlogPosting')
        expect(jsonLd.image).toBeUndefined()
        expect(jsonLd.primaryImageOfPage).toBeUndefined()
    })

    it('should emit bare string image and no primaryImageOfPage for non-BlogPosting type with ogImage', async () => {
        const ogImage = 'https://res.cloudinary.com/example/image/upload/v1/test.jpg'
        const result = await renderAstroComponent(Head, {
            props: {
                ogImage,
                title: 'Home',
                type: 'WebSite',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('WebSite')
        expect(jsonLd.image).toBe(ogImage)
        expect(typeof jsonLd.image).toBe('string')
        expect(jsonLd.primaryImageOfPage).toBeUndefined()
    })

    it('should not emit image for non-BlogPosting type when ogImage is absent', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                title: 'Home',
                type: 'WebSite',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd['@type']).toBe('WebSite')
        expect(jsonLd.image).toBeUndefined()
    })

    it('should not affect datePublished, dateModified, or mainEntityOfPage when BlogPosting has ogImage', async () => {
        const result = await renderAstroComponent(Head, {
            props: {
                createdAt: '2024-03-01',
                ogImage: 'https://res.cloudinary.com/example/image/upload/v1/test.jpg',
                title: 'Test Blog Post',
                type: 'BlogPosting',
                updatedAt: '2024-06-01',
            },
        })

        const jsonLdScript = result.querySelector('script[type="application/ld+json"]')
        const jsonLd = JSON.parse(jsonLdScript?.textContent || '{}')
        expect(jsonLd.datePublished).toBe('2024-03-01')
        expect(jsonLd.dateModified).toBe('2024-06-01')
        expect(jsonLd.mainEntityOfPage['@type']).toBe('WebPage')
    })
})
