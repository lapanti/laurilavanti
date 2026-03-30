import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { ContactEnPage } from './pages/contactEnPage'

test.describe('Contact Page in English', () => {
    test('should render', async ({ page }) => {
        const contactPage = new ContactEnPage(page)
        await contactPage.goTo()

        await contactPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const contactPage = new ContactEnPage(page)
        await contactPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const contactPage = new ContactEnPage(page)
        await contactPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const contactPage = new ContactEnPage(page)
        await contactPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const contactPage = new ContactEnPage(page)
        await contactPage.goTo()

        await contactPage.checkNoHorizontalScroll()
    })
})
