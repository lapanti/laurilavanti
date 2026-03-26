import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { ContactPage } from './pages/contactPage'

test.describe('Contact Page', () => {
    test('should render', async ({ page }) => {
        const contactPage = new ContactPage(page)
        await contactPage.goTo()

        await contactPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const contactPage = new ContactPage(page)
        await contactPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const contactPage = new ContactPage(page)
        await contactPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const contactPage = new ContactPage(page)
        await contactPage.goTo()

        await contactPage.checkNoHorizontalScroll()
    })
})
