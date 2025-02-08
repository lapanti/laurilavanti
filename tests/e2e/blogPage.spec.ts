import AxeBuilder from '@axe-core/playwright'
import test from '@playwright/test'

import { BlogPage } from './pages/blogPage'

test.describe('Blog Page', () => {
    test('should render', async ({ page }) => {
        const blogPage = new BlogPage(page)
        await blogPage.goTo()

        await blogPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const blogPage = new BlogPage(page)
        await blogPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })
})
