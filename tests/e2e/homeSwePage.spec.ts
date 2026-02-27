import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import { test } from '@playwright/test'

import { HomeSwePage } from './pages/homeSwePage'

test.describe('Home Page på svenska', () => {
    test('should render', async ({ page }) => {
        const homePage = new HomeSwePage(page)
        await homePage.goTo()

        await homePage.checkTitles()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const homePage = new HomeSwePage(page)
        await homePage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const homePage = new HomeSwePage(page)
        await homePage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
