import test from '@playwright/test'

import { BlogPage } from './helpers/blogPage'

test.describe('Blog Page', () => {
    test('should render', async ({ page }) => {
        const blogPage = new BlogPage(page)
        await blogPage.goTo()

        await blogPage.checkMainNavigation()

        await blogPage.checkContent()

        await blogPage.checkFooter()
    })
})
