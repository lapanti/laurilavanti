import type { KnipConfig } from 'knip'

const config: KnipConfig = {
    ignore: ['gatsby-browser.tsx', 'gatsby-ssr.js'],
    ignoreDependencies: ['babel-preset-gatsby', 'eslint-import-resolver-typescript', '@fontsource/ibm-plex-sans'],
    jest: {
        config: ['jest.config.{js,ts,mjs,cjs,json}', 'package.json'],
        entry: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    },
}

export default config
