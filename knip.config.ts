import type { KnipConfig } from 'knip'

const config: KnipConfig = {
    entry: ['scripts/upload-to-cf-images.mts', 'scripts/lib/read-json-field.mjs'],
    ignoreBinaries: ['scripts/mdx-validate.sh'],
    ignoreDependencies: ['@iconify-json/fa7-brands', '@iconify-json/fa7-solid', 'eslint-plugin-jsx-a11y'],
}

export default config
