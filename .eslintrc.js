const config = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
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
        {
            env: {
                jest: true,
            },
            files: ['tests/__mocks__/**/*.js', '**/*.spec.js', '**/*.spec.jsx', '**/*.spec.ts', '**/*.spec.tsx'],
            plugins: ['jest'],
            rules: {
                '@typescript-eslint/no-empty-function': ['off'],
                'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
                'jest/expect-expect': ['warn', { assertFunctionNames: ['expect', 'expect[A-Z]\\w+'] }],
                'jest/no-done-callback': ['error'],
                'jest/no-standalone-expect': ['warn'],
                'no-console': ['warn'],
                'react/display-name': ['off'],
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { experimentalObjectRestSpread: true },
        ecmaVersion: 6,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'prettier', 'simple-import-sort', 'react'],
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
        'no-duplicate-imports': ['off'],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-eq-null': ['warn'],
        'no-irregular-whitespace': ['error', { skipTemplates: true }],
        'nonblock-statement-body-position': ['error'],
        'prefer-arrow-callback': ['warn'],
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
        react: {
            version: 'detect',
        },
    },
}

module.exports = config
