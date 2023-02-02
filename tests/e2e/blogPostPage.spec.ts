import test from '@playwright/test'

import { BlogPostPage } from './helpers/blogPostPage'

test.describe('Blog Post Page', () => {
    test('should render', async ({ page }) => {
        const blogPostPage = new BlogPostPage(page)
        await blogPostPage.goTo()

        await blogPostPage.checkContent()
    })
})
