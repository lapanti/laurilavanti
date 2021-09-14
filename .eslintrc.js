const config = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'preact',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            files: ['*.js', '*.jsx'],
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
            files: ['*.ts', '*.tsx'],
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
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: { experimentalObjectRestSpread: true },
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'prettier', 'simple-import-sort'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    rules: {
        'no-duplicate-imports': ['off'],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        '@typescript-eslint/no-extra-semi': ['off'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
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
            },
        ],
        'import/first': ['error'],
        'import/named': ['error'],
        'import/namespace': ['error'],
        'import/newline-after-import': ['error'],
        'import/no-duplicates': ['error'],
        'import/no-unresolved': ['error'],
        'linebreak-style': ['error', 'unix'],
        'max-depth': ['warn', 3],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-eq-null': ['warn'],
        'no-irregular-whitespace': ['error', { skipTemplates: true }],
        'nonblock-statement-body-position': ['error'],
        'prefer-arrow-callback': ['warn'],
        'simple-import-sort/exports': ['error'],
        'simple-import-sort/imports': ['error'],
    },
}

module.exports = config
