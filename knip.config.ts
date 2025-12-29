import type { KnipConfig } from 'knip'

const config: KnipConfig = {
    ignore: ['src/types/contentfulCodegen.ts'],
    ignoreDependencies: [
        '@fontsource/ibm-plex-mono',
        '@fontsource/ibm-plex-sans',
        '@iconify-json/fa7-brands',
        'eslint-plugin-jsx-a11y',
    ],
}

export default config
