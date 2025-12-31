// @ts-check

import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import vitest from '@vitest/eslint-plugin'
import { defineConfig } from 'eslint/config' // eslint-disable-line import/no-unresolved
import { configs } from 'eslint-plugin-astro'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint' // eslint-disable-line import/no-unresolved

const testFileGlob = [
    'tests/__mocks__/**/*.js',
    'src/**/*.spec.js',
    'src/**/*.spec.jsx',
    'src/**/*.spec.ts',
    'src/**/*.spec.tsx',
]

export default defineConfig([
    {
        extends: ['js/recommended'],
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: { globals: globals.browser },
        plugins: { js },
    },
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    tseslint.configs.recommended,
    configs.recommended,
    configs['jsx-a11y-strict'],
    {
        files: ['**/*.js', '**/*.ts', '**/*.astro', '**/*.spec.js', '**/*.spec.ts'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2015,
            },
        },
        plugins: {
            '@stylistic': stylistic,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/lines-around-comment': ['error', { beforeBlockComment: true }],
            '@stylistic/multiline-comment-style': ['error', 'starred-block'],
            '@stylistic/no-mixed-spaces-and-tabs': ['error'],
            '@stylistic/no-multi-spaces': ['error'],
            '@stylistic/no-multiple-empty-lines': ['error'],
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', next: 'return', prev: 'const' },
                { blankLine: 'always', next: 'return', prev: 'let' },
                { blankLine: 'always', next: 'throw', prev: 'const' },
                { blankLine: 'always', next: 'throw', prev: 'let' },
            ],
            '@stylistic/spaced-comment': ['error', 'always'],
            '@stylistic/template-curly-spacing': ['error', 'never'],
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/no-extra-semi': ['off'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    vars: 'all',
                },
            ],
            '@typescript-eslint/no-use-before-define': ['error'],
            'eol-last': ['error', 'always'],
            eqeqeq: ['error', 'smart'],
            'import/extensions': [
                'error',
                'never',
                {
                    css: 'always',
                    json: 'always',
                },
            ],
            'import/first': ['error'],
            'import/named': ['error'],
            'import/namespace': ['error'],
            'import/newline-after-import': ['error'],
            'import/no-duplicates': ['error'],
            'import/no-unresolved': ['error'],
            'linebreak-style': ['error', 'unix'],
            'max-depth': ['error', 3],
            'no-duplicate-imports': ['off'],
            'no-else-return': ['error', { allowElseIf: false }],
            'no-empty': ['error', { allowEmptyCatch: true }],
            'no-eq-null': ['error'],
            'no-irregular-whitespace': ['error', { skipTemplates: true }],
            'no-restricted-globals': ['error'],
            'nonblock-statement-body-position': ['error'],
            'prefer-arrow-callback': ['error'],
            'simple-import-sort/exports': ['error'],
            'simple-import-sort/imports': ['error'],
            'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
        },
    },
    {
        files: ['**/*.astro'],
        rules: {
            'astro/no-set-text-directive': ['error'],
            'astro/no-unused-css-selector': ['error'],
            'astro/prefer-class-list-directive': ['error'],
            'astro/prefer-object-class-list': ['error'],
            'astro/prefer-split-class-list': ['error'],
            'astro/sort-attributes': ['error'],
        },
    },
    {
        files: ['**/*.js'],
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': ['off'],
            '@typescript-eslint/no-unsafe-call': ['off'],
            '@typescript-eslint/no-unsafe-member-access': ['off'],
            '@typescript-eslint/no-unsafe-return': ['off'],
            '@typescript-eslint/no-var-requires': ['off'],
            '@typescript-eslint/restrict-template-expressions': ['off'],
        },
    },
    {
        /**
         * This magic grouping moves `import type` statements as their own group.
         * @see https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
         */
        files: ['**/*.spec.ts', '**/*.ts', '**/*.astro'],
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
                        ['^\\u0000'],
                        ['^@?\\w'],
                        ['^'],
                        ['^\\.'],
                    ],
                },
            ],
        },
    },
    {
        files: testFileGlob,
        languageOptions: {
            globals: {
                ...vitest.environments.env.globals,
            },
            parserOptions: {
                projectService: true,
            },
        },
        plugins: {
            vitest,
        },
        rules: {
            ...vitest.configs.recommended.rules,
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
    eslintPluginPrettierRecommended,
])
