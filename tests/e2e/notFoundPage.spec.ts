import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { NotFoundPage } from './pages/notFoundPage'

test.describe('404 Not Found Page', () => {
    test('should render', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await notFoundPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
