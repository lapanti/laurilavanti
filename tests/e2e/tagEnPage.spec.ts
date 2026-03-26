import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { TagEnPage } from './pages/tagEnPage'

test.describe('Tag/Category Page in English', () => {
    test('should render', async ({ page }) => {
        const tagPage = new TagEnPage(page)
        await tagPage.goTo()

        await tagPage.checkContent()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const tagPage = new TagEnPage(page)
        await tagPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should match screenshot', async ({ page }) => {
        const tagPage = new TagEnPage(page)
        await tagPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const tagPage = new TagEnPage(page)
        await tagPage.goTo()

        await tagPage.checkNoHorizontalScroll()
    })
})
