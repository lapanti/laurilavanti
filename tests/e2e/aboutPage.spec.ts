import test from '@playwright/test'

import { AboutPage } from './pages/aboutPage'

test.describe('About Page', () => {
    test('should render', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        await aboutPage.checkContent()

        await aboutPage.testScreenshot()
    })
})
