// @ts-check
import { defineConfig } from 'astro/config'

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
})
