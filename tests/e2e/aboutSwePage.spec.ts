import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { AboutSwePage } from './pages/aboutSwePage'

test.describe('About Page på svenska', () => {
    test('should render', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        await aboutPage.checkContent()
    })

    test('should match aria snapshot', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        await aboutPage.checkNoHorizontalScroll()
    })

    test('should expand and collapse summary', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        await aboutPage.checkSummaryCollapse()
    })
})
