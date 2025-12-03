// @ts-check
import { defineConfig, envField } from 'astro/config'

import react from '@astrojs/react'

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

    integrations: [react()],

    env: {
        schema: {
            CONTENTFUL_SPACE_ID: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_DELIVERY_TOKEN: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_PREVIEW_TOKEN: envField.string({ context: 'server', access: 'public' }),
        },
    },
})
