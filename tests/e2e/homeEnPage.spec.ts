import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import { test } from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { HomeEnPage } from './pages/homeEnPage'

test.describe('Home Page in English', () => {
    test('should render', async ({ page }) => {
        const homePage = new HomeEnPage(page)
        await homePage.goTo()

        await homePage.checkTitles()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const homePage = new HomeEnPage(page)
        await homePage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const homePage = new HomeEnPage(page)
        await homePage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const homePage = new HomeEnPage(page)
        await homePage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should mark home nav link as current page', async ({ page }) => {
        const homePage = new HomeEnPage(page)
        await homePage.goTo()

        await homePage.checkNavLinkHomeAriaCurrent()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const homePage = new HomeEnPage(page)
        await homePage.goTo()

        await homePage.checkNoHorizontalScroll()
    })
})
