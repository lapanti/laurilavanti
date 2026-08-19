// @ts-check
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'astro/config'

import icon from 'astro-icon'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import { tags } from './src/content/tags'
import { buildPageDateMap } from './src/lib/sitemapLastmod'
import { redirects } from './src/lib/redirects'
import { redirectsFile } from './src/lib/redirectsIntegration'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pageDateMap = buildPageDateMap({
    pagesDir: join(__dirname, 'src', 'pages'),
    postsDir: join(__dirname, 'src', 'content', 'posts'),
    tags,
})

// https://astro.build/config
export default defineConfig({
    site: 'https://lavanti.fi/',
    redirects,
    trailingSlash: 'always',
    output: 'static',
    compressHTML: true,

    build: {
        inlineStylesheets: 'always',
    },

    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover',
    },

    i18n: {
        defaultLocale: 'fi',
        locales: ['en', 'fi', 'sv'],
        routing: {
            prefixDefaultLocale: true,
        },
    },

    image: {
        service: { entrypoint: 'astro/assets/services/noop' },
    },

    integrations: [
        mdx(),
        icon({ include: { 'fa7-brands': ['*'], 'fa7-solid': ['rss'] } }),
        sitemap({
            filter: (page) =>
                // Exclude root — client-side language-detection dispatcher, no real content (noindex)
                new URL(page).pathname !== '/' &&
                // Exclude bare /{lang}/blog/{id}/ redirect pages
                !/\/(en|fi|sv)\/blog\/\d+\/$/.test(page) &&
                // Exclude old /kategoria/ redirect pages
                !/\/kategoria\//.test(page) &&
                // Exclude recommendations pages for now
                !/\/(en|fi|sv)\/recommendations\//.test(page),
            serialize: (item) => {
                const path = decodeURIComponent(new URL(item.url).pathname)
                const date = pageDateMap.get(path)
                return date ? { ...item, lastmod: date } : item
            },
        }),
        // Emit dist/_redirects so Cloudflare Pages serves the redirect map and
        // bare-id → slug redirects as true 301s (the meta-refresh stubs remain
        // as an `astro preview` fallback).
        redirectsFile(),
    ],
})
