import test from '@playwright/test'

import { BlogPage } from './pages/blogPage'

test.describe('Blog Page', () => {
    test('should render', async ({ page }) => {
        const blogPage = new BlogPage(page)
        await blogPage.goTo()

        await blogPage.checkContent()

        await blogPage.testScreenshot()
    })
})
