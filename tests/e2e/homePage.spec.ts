import AxeBuilder from '@axe-core/playwright'
import { test } from '@playwright/test'

import { HomePage } from './pages/homePage'

test.describe('Home Page', () => {
    test('should render', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        await homePage.checkTitles()

        // await homePage.testScreenshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })
})
