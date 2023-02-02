import test from '@playwright/test'

import { ContactPage } from './pages/contactPage'

test.describe('Contact Page', () => {
    test('should render', async ({ page }) => {
        const contactPage = new ContactPage(page)
        await contactPage.goTo()

        await contactPage.checkContent()
    })
})
