import type { KnipConfig } from 'knip'

const config: KnipConfig = {
    entry: ['scripts/checks/cross-file.mjs', 'scripts/checks/mdx-deep.ts'],
    ignoreBinaries: ['scripts/mdx-validate.sh'],
    ignoreDependencies: ['@iconify-json/fa7-brands', '@iconify-json/fa7-solid', 'eslint-plugin-jsx-a11y'],
}

export default config
