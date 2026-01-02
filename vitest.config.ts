/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config' // eslint-disable-line import/no-unresolved

export default getViteConfig({
    test: {
        environment: 'happy-dom',
        setupFiles: ['./test/setup.ts'],
    },
})
