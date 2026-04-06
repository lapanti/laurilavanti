import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import { test } from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { HomeEnPage } from './pages/homeEnPage'
import { HomePage } from './pages/homePage'

test.describe('Home Page at root (/)', () => {
    test('should render Finnish front page content', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        await homePage.checkTitles()
    })

    test('should match aria snapshot', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        await test.expect(page).toHaveScreenshot()
    })

    test('should have canonical pointing to /fi/', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        const canonical = page.locator('link[rel="canonical"]')
        await test.expect(canonical).toHaveAttribute('href', /\/fi\/$/)
    })

    test('should mark home nav link as current page', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        await homePage.checkNavLinkHomeAriaCurrent()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goToRoot()

        await homePage.checkNoHorizontalScroll()
    })
})

test.describe('Home Page', () => {
    test('should render', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        await homePage.checkTitles()
    })

    test('should match aria snapshot', async ({ page }) => {
        const homePage = new HomeEnPage(page)
        await homePage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        await test.expect(page).toHaveScreenshot()
    })

    test('should mark home nav link as current page', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        await homePage.checkNavLinkHomeAriaCurrent()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        await homePage.checkNoHorizontalScroll()
    })
})
