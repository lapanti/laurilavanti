// @ts-check

import simpleImportSort from 'eslint-plugin-simple-import-sort'
import react from 'eslint-plugin-react'
import globals from 'globals'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jest from 'eslint-plugin-jest'
import importPlugin from 'eslint-plugin-import'
import js from '@eslint/js'
import testingLibrary from 'eslint-plugin-testing-library'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import playwright from 'eslint-plugin-playwright'
import stylistic from '@stylistic/eslint-plugin'
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint'
import restrictedGlobals from 'confusing-browser-globals'

const testFileGlob = [
    'tests/__mocks__/**/*.js',
    'src/**/*.spec.js',
    'src/**/*.spec.jsx',
    'src/**/*.spec.ts',
    'src/**/*.spec.tsx',
]

export default tseslint.config(
    js.configs.recommended,
    jsxA11y.flatConfigs.recommended,
    jsxA11y.flatConfigs.strict,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    tseslint.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        plugins: {
            'simple-import-sort': simpleImportSort,
            react,
            '@stylistic': stylistic,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2015,
            },
        },
        rules: {
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
                    json: 'always',
                    css: 'always',
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
            'no-restricted-globals': ['error'].concat(restrictedGlobals),
            'nonblock-statement-body-position': ['error'],
            'prefer-arrow-callback': ['error'],
            'react/jsx-sort-props': [
                'error',
                {
                    callbacksLast: true,
                    ignoreCase: true,
                    reservedFirst: true,
                    shorthandLast: true,
                },
            ],
            'simple-import-sort/exports': ['error'],
            'simple-import-sort/imports': ['error'],
            'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/lines-around-comment': ['error', { beforeBlockComment: true }],
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'const', next: 'return' },
                { blankLine: 'always', prev: 'let', next: 'return' },
                { blankLine: 'always', prev: 'const', next: 'throw' },
                { blankLine: 'always', prev: 'let', next: 'throw' },
            ],
            '@stylistic/multiline-comment-style': ['error', 'starred-block'],
            '@stylistic/no-mixed-spaces-and-tabs': ['error'],
            '@stylistic/no-multi-spaces': ['error'],
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
                },
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
    },
    {
        files: ['**/*.js', '**/*.jsx'],
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
        files: ['**/*.ts', '**/*.tsx'],
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
        ...jest.configs['flat/recommended'],
    },
    {
        files: testFileGlob,
        ...jest.configs['flat/style'],
    },
    {
        // Don't want to match these to e2e tests
        files: testFileGlob,
        ...testingLibrary.configs['flat/react'],
    },
    {
        files: testFileGlob,
        rules: {
            '@typescript-eslint/no-empty-function': ['off'],
            'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
            'no-console': ['warn'],
            'react/display-name': ['off'],
            'testing-library/no-node-access': ['error', { allowContainerFirstChild: true }],
        },
    },
    {
        files: ['tests/e2e/**/*.spec.ts', 'tests/e2e/pages/**/*.ts'],
        ...playwright.configs['flat/recommended'],
    },
    eslintPluginPrettierRecommended
)
