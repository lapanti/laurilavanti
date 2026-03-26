import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { NewsletterEnPage } from './pages/newsletterEnPage'

test.describe('Newsletter Page (English)', () => {
    test('should render', async ({ page }) => {
        const newsletterPage = new NewsletterEnPage(page)
        await newsletterPage.goTo()

        await newsletterPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const newsletterPage = new NewsletterEnPage(page)
        await newsletterPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const newsletterPage = new NewsletterEnPage(page)
        await newsletterPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should render the newsletter form', async ({ page }) => {
        const newsletterPage = new NewsletterEnPage(page)
        await newsletterPage.goTo()

        await test.expect(newsletterPage.emailInput).toBeVisible()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const newsletterPage = new NewsletterEnPage(page)
        await newsletterPage.goTo()

        await newsletterPage.checkNoHorizontalScroll()
    })
})
