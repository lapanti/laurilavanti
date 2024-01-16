const config = {
    transform: {
        '^.+\\.[jt]sx?$': `<rootDir>/tests/jest-preprocess.js`,
    },
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/tests/__mocks__/file-mock.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`, `tests/e2e`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`],
    globals: {
        __PATH_PREFIX__: ``,
    },
    setupFiles: [`<rootDir>/tests/loadershim.js`],
    testEnvironment: `jsdom`,
    setupFilesAfterEnv: ['<rootDir>/tests/setup-test-env.ts'],
    rootDir: '..',
    snapshotResolver: '<rootDir>/tests/snapshotResolver.js',
}

module.exports = config
