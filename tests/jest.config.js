const config = {
    transform: {
        '^.+\\.[jt]sx?$': `<rootDir>/tests/jest-preprocess.js`,
    },
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/tests/__mocks__/file-mock.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`, `tests/e2e`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link|gatsby-ssr)/)`],
    globals: {
        __PATH_PREFIX__: ``,
    },
    setupFiles: [`<rootDir>/tests/loadershim.js`],
    testEnvironment: `jsdom`,
    setupFilesAfterEnv: ['<rootDir>/tests/setup-test-env.ts'],
    rootDir: '..',
    snapshotResolver: '<rootDir>/tests/snapshotResolver.js',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 0,
        },
    },
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.spec.{js,jsx,ts,tsx}',
        '!**/*.mock.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!.cache/**',
        '!coverage/**',
        '!public/**',
        '!tests/e2e/**',
        '!src/types/**',
        '!.eslintrc.js',
        '!.prettierrc.js',
        '!env.ts',
        '!gatsby-browser.tsx',
        '!gatsby-config.ts',
        '!gatsby-node.js',
        '!gatsby-ssr.js',
        '!playwright.config.ts',
        '!knip.config.ts',
        '!lighthouserc.js',
        '!tests/jest-preprocess.js',
        '!tests/jest.config.js',
        '!tests/snapshotResolver.js',
    ],
}

module.exports = config
