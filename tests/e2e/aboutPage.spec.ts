import AxeBuilder from '@axe-core/playwright'
import test from '@playwright/test'

import { AboutPage } from './pages/aboutPage'

test.describe('About Page', () => {
    test('should render', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        await aboutPage.checkContent()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])

        await aboutPage.testScreenshot()
    })
})
