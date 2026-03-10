import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { RecommendationsEnPage } from './pages/recommendationsEnPage'

test.describe('Recommendations Page in english', () => {
    test('should render', async ({ page }) => {
        const recommendationsPage = new RecommendationsEnPage(page)
        await recommendationsPage.goTo()

        await recommendationsPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const recommendationsPage = new RecommendationsEnPage(page)
        await recommendationsPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const recommendationsPage = new RecommendationsEnPage(page)
        await recommendationsPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
