import AxeBuilder from '@axe-core/playwright'
import test from '@playwright/test'

import { ContactPage } from './pages/contactPage'

test.describe('Contact Page', () => {
    test('should render', async ({ page }) => {
        const contactPage = new ContactPage(page)
        await contactPage.goTo()

        await contactPage.checkContent()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])

        await contactPage.testScreenshot()
    })
})
