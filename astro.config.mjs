// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config'

import react from '@astrojs/react'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
    site: 'https://laurilavanti.fi',
    trailingSlash: 'always',
    output: 'static',
    compressHTML: true,

    build: {
        inlineStylesheets: 'auto',
    },

    experimental: {
        fonts: [
            {
                name: "IBM Plex Mono",
                cssVariable: '--ibmPlexMono',
                provider: fontProviders.fontsource(),
                weights: [300, 400, 500, 1000],
                styles: ['normal', 'italic'],
                subsets: ['latin', 'latin-ext'],
                fallbacks: ['Lucida Sans Typewriter'],
            },
            {
                name: "IBM Plex Sans",
                cssVariable: '--ibmPlexSans',
                provider: fontProviders.fontsource(),
                weights: [300, 400, 500, 1000],
                styles: ['normal', 'italic'],
                subsets: ['latin', 'latin-ext'],
                fallbacks: ['Trebuchet MS'],
            }
        ]
    },

    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover',
    },

    image: {
        domains: ['images.ctfassets.net'],
    },

    integrations: [react(), icon({ include: { 'fa7-brands': ['*'] } })],

    env: {
        schema: {
            CONTENTFUL_SPACE_ID: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_DELIVERY_TOKEN: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_PREVIEW_TOKEN: envField.string({ context: 'server', access: 'public' }),
        },
    },
})
