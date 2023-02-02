import test from '@playwright/test'

import { TagPage } from './pages/tagPage'

test.describe('Tag Page', () => {
    test('should render', async ({ page }) => {
        const tagPage = new TagPage(page)
        await tagPage.goTo()

        await tagPage.checkContent()

        await tagPage.testScreenshot()
    })
})
