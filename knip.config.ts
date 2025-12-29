import type { KnipConfig } from 'knip'

const config: KnipConfig = {
    ignore: [],
    ignoreDependencies: ['eslint-import-resolver-typescript'],
    jest: {
        config: ['jest.config.{js,ts,mjs,cjs,json}', 'package.json'],
        entry: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    },
}

export default config
