import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { BlogPostPage } from './pages/blogPostPage'

test.describe('Blog Post Page', () => {
    test('should render', async ({ page }) => {
        const blogPostPage = new BlogPostPage(page)
        await blogPostPage.goTo()

        await blogPostPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()

        await test.expect(page).toHaveScreenshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const blogPostPage = new BlogPostPage(page)
        await blogPostPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })
})
