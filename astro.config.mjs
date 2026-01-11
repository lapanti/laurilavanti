// @ts-check
import { defineConfig, envField } from 'astro/config' // eslint-disable-line import/no-unresolved

import icon from 'astro-icon' // eslint-disable-line import/no-unresolved
import { imageService } from '@unpic/astro/service' // eslint-disable-line import/no-unresolved

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://laurilavanti.fi',
    trailingSlash: 'always',
    output: 'static',
    compressHTML: true,

    build: {
        inlineStylesheets: 'auto',
    },

    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover',
    },

    image: {
        domains: ['images.ctfassets.net'],
        service: imageService({
            placeholder: 'blurhash',
        }),
    },

    integrations: [icon({ include: { 'fa7-brands': ['*'] } }), sitemap()],

    env: {
        schema: {
            CONTENTFUL_SPACE_ID: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_DELIVERY_TOKEN: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_PREVIEW_TOKEN: envField.string({ context: 'server', access: 'public' }),
        },
    },
})