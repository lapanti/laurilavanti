import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { CitationsEnPage } from './pages/citationsEnPage'

test.describe('Citations Page in english', () => {
    test('should render', async ({ page }) => {
        const citationsPage = new CitationsEnPage(page)
        await citationsPage.goTo()

        await citationsPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const citationsPage = new CitationsEnPage(page)
        await citationsPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const citationsPage = new CitationsEnPage(page)
        await citationsPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
