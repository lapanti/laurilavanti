import AxeBuilder from '@axe-core/playwright'
import test from '@playwright/test'

import { BlogPostPage } from './pages/blogPostPage'

test.describe('Blog Post Page', () => {
    test('should render', async ({ page }) => {
        const blogPostPage = new BlogPostPage(page)
        await blogPostPage.goTo()

        await blogPostPage.checkContent()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])

        await blogPostPage.testScreenshot()
    })
})
