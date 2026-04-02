import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { NewsletterSwePage } from './pages/newsletterSwePage'

test.describe('Newsletter Page (Swedish)', () => {
    test('should render', async ({ page }) => {
        const newsletterPage = new NewsletterSwePage(page)
        await newsletterPage.goTo()

        await newsletterPage.checkContent()
    })

    test('should match aria snapshot', async ({ page }) => {
        const newsletterPage = new NewsletterSwePage(page)
        await newsletterPage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const newsletterPage = new NewsletterSwePage(page)
        await newsletterPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const newsletterPage = new NewsletterSwePage(page)
        await newsletterPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const newsletterPage = new NewsletterSwePage(page)
        await newsletterPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should render the newsletter form', async ({ page }) => {
        const newsletterPage = new NewsletterSwePage(page)
        await newsletterPage.goTo()

        await test.expect(newsletterPage.emailInput).toBeVisible()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const newsletterPage = new NewsletterSwePage(page)
        await newsletterPage.goTo()

        await newsletterPage.checkNoHorizontalScroll()
    })
})
