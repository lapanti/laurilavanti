import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { AboutSwePage } from './pages/aboutSwePage'

test.describe('About Page på svenska', () => {
    test('should render', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        await aboutPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()

        await test.expect(page).toHaveScreenshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const aboutPage = new AboutSwePage(page)
        await aboutPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })
})
