import AxeBuilder from '@axe-core/playwright'
import test from '@playwright/test'

import { TagPage } from './pages/tagPage'

test.describe('Tag Page', () => {
    test('should render', async ({ page }) => {
        const tagPage = new TagPage(page)
        await tagPage.goTo()

        await tagPage.checkContent()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])

        await tagPage.testScreenshot()
    })
})
