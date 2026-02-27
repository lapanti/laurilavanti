import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { BlogSwePage } from './pages/blogSwePage'

test.describe('Blog Page på svenska', () => {
    test('should render', async ({ page }) => {
        const blogPage = new BlogSwePage(page)
        await blogPage.goTo()

        await blogPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const blogPage = new BlogSwePage(page)
        await blogPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const blogPage = new BlogSwePage(page)
        await blogPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
