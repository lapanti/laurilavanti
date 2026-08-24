import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import {
    auditCrawlerResources,
    auditFinnishAliases,
    auditInternalLinks,
    auditPageMetadataOutput,
    auditRedirectRules,
    loadDistState,
    parseRedirects,
} from './dist-contracts.mjs'

const temporaryDirectories: string[] = []

const createDist = async (files: Record<string, string>) => {
    const distDir = await mkdtemp(join(tmpdir(), 'dist-contracts-'))
    temporaryDirectories.push(distDir)

    for (const [relativePath, content] of Object.entries(files)) {
        const file = join(distDir, relativePath)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, content)
    }

    return distDir
}

const indexablePage = ({
    body = '',
    lang,
    pathname,
    schemas,
}: {
    body?: string
    lang: 'en' | 'fi' | 'sv'
    pathname: string
    schemas?: object[]
}) => {
    const suffix = pathname.replace(/^\/(en|fi|sv)/, '')
    const canonical = `https://lavanti.fi${pathname}`
    const primarySchemas = schemas ?? [
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            description: 'Description',
            inLanguage: lang,
            name: 'Page',
            url: canonical,
        },
    ]

    return `<!doctype html><html lang="${lang}"><head>
        <link rel="canonical" href="${canonical}">
        <meta property="og:url" content="${canonical}">
        <link rel="alternate" hreflang="fi" href="https://lavanti.fi/fi${suffix}">
        <link rel="alternate" hreflang="sv" href="https://lavanti.fi/sv${suffix}">
        <link rel="alternate" hreflang="en" href="https://lavanti.fi/en${suffix}">
        <link rel="alternate" hreflang="x-default" href="https://lavanti.fi/fi${suffix}">
        <meta name="theme-color" content="#006275">
        ${primarySchemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('')}
    </head><body>${body}</body></html>`
}

afterEach(async () => {
    await Promise.all(
        temporaryDirectories.splice(0).map((directory) => rm(directory, { force: true, recursive: true }))
    )
})

describe('parseRedirects', () => {
    it('parses comments and reports malformed declarations', () => {
        const result = parseRedirects('# comment\n/old/ /fi/about/ 301\ninvalid line\n')

        expect(result.rules).toEqual([{ destination: '/fi/about/', line: 2, source: '/old/', status: 301 }])
        expect(result.findings.map(({ code }) => code)).toEqual(['redirect-syntax'])
    })
})

describe('loadDistState', () => {
    it('discovers canonical routes, redirect stubs, and assets from dist', async () => {
        const distDir = await createDist({
            _redirects: '/old/ /fi/about/ 301\n',
            'asset.png': 'image',
            'fi/about/index.html': '<p>About</p>',
            'fi/index.html': '<p>Home</p>',
            'old/index.html': '<meta http-equiv="refresh" content="0;url=/fi/about/">',
        })

        const state = await loadDistState({ distDir })

        expect([...state.canonicalRoutes].sort()).toEqual(['/fi/', '/fi/about/'])
        expect([...state.redirectSources]).toEqual(['/old/'])
        expect([...state.assetPaths]).toContain('/asset.png')
    })
})

describe('route contracts', () => {
    it('accepts canonical links, assets, and direct redirect targets', async () => {
        const distDir = await createDist({
            _redirects: '/old/ /fi/about/ 301\n',
            'asset.png': 'image',
            'fi/about/index.html': '<a href="/fi/">Home</a>',
            'fi/index.html': '<a href="/fi/about/">About</a><a href="/asset.png">Asset</a>',
            'old/index.html': '<a href="/fi/about/">Redirect</a>',
        })

        const state = await loadDistState({ distDir })

        expect([...auditRedirectRules(state), ...auditInternalLinks(state)]).toEqual([])
    })

    it('reports chains, conflicts, and invalid local links', async () => {
        const distDir = await createDist({
            _redirects: [
                '/old/ /legacy/ 301',
                '/legacy/ /fi/about/ 301',
                '/duplicate/ /fi/about/ 301',
                '/duplicate/ /fi/ 301',
            ].join('\n'),
            'fi/about/index.html': '<p>About</p>',
            'fi/index.html': [
                '<a href="/old/">Redirect</a>',
                '<a href="/fi/about">No slash</a>',
                '<a href="http://localhost:4321/fi/">Localhost</a>',
                '<a href="/missing/">Missing</a>',
            ].join(''),
            'legacy/index.html': '<p>Legacy</p>',
            'old/index.html': '<p>Old</p>',
        })

        const state = await loadDistState({ distDir })
        const findings = [...auditRedirectRules(state), ...auditInternalLinks(state)]
        const codes = findings.map(({ code }) => code)

        expect(codes).toEqual(
            expect.arrayContaining([
                'link-localhost',
                'link-noncanonical',
                'link-redirect',
                'link-target-missing',
                'redirect-chain',
                'redirect-conflict',
            ])
        )
    })
})

describe('Finnish alias contracts', () => {
    it('accepts both locale-less forms for every canonical Finnish page except root', async () => {
        const distDir = await createDist({
            _redirects: '/about /fi/about/ 301\n/about/ /fi/about/ 301\n',
            'fi/about/index.html': '<p>About</p>',
            'fi/index.html': '<p>Home</p>',
        })
        const state = await loadDistState({ distDir })

        expect(auditFinnishAliases(state)).toEqual([])
    })

    it('reports missing and misdirected aliases', async () => {
        const distDir = await createDist({
            _redirects: '/about /fi/ 301\n',
            'fi/about/index.html': '<p>About</p>',
            'fi/index.html': '<p>Home</p>',
        })
        const state = await loadDistState({ distDir })
        const codes = auditFinnishAliases(state).map(({ code }) => code)

        expect(codes).toEqual(expect.arrayContaining(['finnish-alias-missing', 'finnish-alias-target']))
    })
})

describe('page metadata contracts', () => {
    it('accepts canonical metadata and type-specific JSON-LD', async () => {
        const distDir = await createDist({
            _redirects: '',
            'en/about/index.html': indexablePage({ lang: 'en', pathname: '/en/about/' }),
            'fi/about/index.html': indexablePage({ lang: 'fi', pathname: '/fi/about/' }),
            'sv/about/index.html': indexablePage({ lang: 'sv', pathname: '/sv/about/' }),
        })
        const state = await loadDistState({ distDir })

        expect(auditPageMetadataOutput(state)).toEqual([])
    })

    it('suppresses discovery metadata on noindex pages', async () => {
        const distDir = await createDist({
            _redirects: '',
            'fi/recommendations/index.html': `
                <meta name="robots" content="noindex, nofollow">
                <link rel="canonical" href="https://lavanti.fi/fi/recommendations/">
                <link rel="alternate" hreflang="fi" href="https://lavanti.fi/fi/recommendations/">
                <meta property="og:url" content="https://lavanti.fi/fi/recommendations/">
                <script type="application/ld+json">{"@type":"WebPage"}</script>`,
        })
        const state = await loadDistState({ distDir })
        const codes = auditPageMetadataOutput(state).map(({ code }) => code)

        expect(codes).toEqual(
            expect.arrayContaining([
                'noindex-canonical',
                'noindex-directive',
                'noindex-hreflang',
                'noindex-jsonld',
                'noindex-og-url',
            ])
        )
    })

    it('reports cross-type fields, null URLs, and hidden FAQ content', async () => {
        const invalidSchemas = [
            {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                description: 'Description',
                headline: 'Wrong field',
                inLanguage: 'fi',
                name: 'Page',
                url: null,
            },
            {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    { '@type': 'Question', acceptedAnswer: { '@type': 'Answer', text: 'Hidden A' }, name: 'Hidden Q?' },
                    {
                        '@type': 'Question',
                        acceptedAnswer: { '@type': 'Answer', text: 'Hidden B' },
                        name: 'Another Q?',
                    },
                ],
            },
        ]
        const distDir = await createDist({
            _redirects: '',
            'en/about/index.html': indexablePage({ lang: 'en', pathname: '/en/about/' }),
            'fi/about/index.html': indexablePage({ lang: 'fi', pathname: '/fi/about/', schemas: invalidSchemas }),
            'sv/about/index.html': indexablePage({ lang: 'sv', pathname: '/sv/about/' }),
        })
        const state = await loadDistState({ distDir })
        const codes = auditPageMetadataOutput(state).map(({ code }) => code)

        expect(codes).toEqual(
            expect.arrayContaining([
                'faq-answer-hidden',
                'faq-question-hidden',
                'jsonld-field-forbidden',
                'jsonld-field-required',
                'jsonld-null',
            ])
        )
    })
})

describe('crawler resource contracts', () => {
    it('accepts canonical robots, sitemap, and llms output', async () => {
        const urls = ['/fi/', '/fi/about/', '/fi/blog/']
        const sitemapUrls = urls
            .map((pathname) => `<url><loc>https://lavanti.fi${pathname}</loc><lastmod>2026-08-24</lastmod></url>`)
            .join('')
        const distDir = await createDist({
            _redirects: '',
            'fi/about/index.html': '<p>About</p>',
            'fi/blog/index.html': '<p>Blog</p>',
            'fi/index.html': '<p>Home</p>',
            'llms.txt': urls.map((pathname) => `- [Page](https://lavanti.fi${pathname})`).join('\n'),
            'robots.txt': 'User-agent: *\nAllow: /\nSitemap: https://lavanti.fi/sitemap-index.xml\n',
            'sitemap-0.xml': `<urlset>${sitemapUrls}</urlset>`,
            'sitemap-index.xml':
                '<sitemapindex><sitemap><loc>https://lavanti.fi/sitemap-0.xml</loc></sitemap></sitemapindex>',
        })
        const state = await loadDistState({ distDir })

        await expect(auditCrawlerResources(state)).resolves.toEqual([])
    })

    it('reports stale crawler URLs, noindex sitemap entries, and missing dates', async () => {
        const distDir = await createDist({
            _redirects: '',
            'fi/about/index.html': '<meta name="robots" content="noindex">',
            'fi/index.html': '<p>Home</p>',
            'llms.txt': '- [Home](https://lavanti.fi/fi/)\n- [About](https://lavanti.fi/fi/about)',
            'robots.txt': 'User-agent: *\nAllow: /\nSitemap: https://lavanti.fi/wrong.xml\n',
            'sitemap-0.xml': '<urlset><url><loc>https://lavanti.fi/fi/about/</loc></url></urlset>',
            'sitemap-index.xml':
                '<sitemapindex><sitemap><loc>https://lavanti.fi/sitemap-0.xml</loc></sitemap></sitemapindex>',
        })
        const state = await loadDistState({ distDir })
        const codes = (await auditCrawlerResources(state)).map(({ code }) => code)

        expect(codes).toEqual(
            expect.arrayContaining(['llms-pillar', 'llms-url', 'robots-sitemap', 'sitemap-lastmod', 'sitemap-noindex'])
        )
    })
})
