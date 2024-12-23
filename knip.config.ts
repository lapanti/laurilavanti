import type { KnipConfig } from 'knip'

const config: KnipConfig = {
    ignore: ['lighthouserc.js'],
    ignoreDependencies: ['babel-preset-gatsby', 'identity-obj-proxy', 'jest-environment-jsdom', 'eslint-import-resolver-typescript'],
    jest: {
        config: ['jest.config.{js,ts,mjs,cjs,json}', 'package.json'],
        entry: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    },
}

export default config
