import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import-x/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { AboutPage } from './pages/aboutPage'

test.describe('About Page', () => {
    test('should render', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        await aboutPage.checkContent()
    })

    test('should show the slim signal band below the hero', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        /*
         * Signal Band separator between the split hero and the page plates —
         * decorative (aria-hidden), so aria snapshots never guard it and the
         * screenshot diff ratio can absorb it silently. Assert it explicitly.
         */
        await test.expect(page.locator('main .stripes--slim')).toBeVisible()
    })

    test('should match aria snapshot', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
