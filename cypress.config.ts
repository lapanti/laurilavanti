import { defineConfig } from 'cypress'

const config = defineConfig({
    viewportWidth: process.env.CY_MOBILE === 'true' ? 375 : 1920,
    viewportHeight: process.env.CY_MOBILE === 'true' ? 667 : 1080,
    downloadsFolder: 'tests/cypress/downloads',
    fixturesFolder: false,
    screenshotsFolder: 'tests/cypress/screenshots',
    videosFolder: 'tests/cypress/videos',
    retries: {
        runMode: 3,
        openMode: 0,
    },
    e2e: {
        baseUrl: 'http://localhost:8000',
        specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'tests/cypress/support/index.js',
    },
})

export default config
