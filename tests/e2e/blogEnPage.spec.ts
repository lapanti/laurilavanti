import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { BlogEnPage } from './pages/blogEnPage'

test.describe('Blog Page in English', () => {
    test('should render', async ({ page }) => {
        const blogPage = new BlogEnPage(page)
        await blogPage.goTo()

        await blogPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const blogPage = new BlogEnPage(page)
        await blogPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const blogPage = new BlogEnPage(page)
        await blogPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
