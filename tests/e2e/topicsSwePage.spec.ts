import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { TopicsSwePage } from './pages/topicsSwePage'

test.describe('Topics Page på svenska', () => {
    test('should render', async ({ page }) => {
        const topicsPage = new TopicsSwePage(page)
        await topicsPage.goTo()

        await topicsPage.checkContent()
    })

    test('should match aria snapshot', async ({ page }) => {
        const topicsPage = new TopicsSwePage(page)
        await topicsPage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const topicsPage = new TopicsSwePage(page)
        await topicsPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const topicsPage = new TopicsSwePage(page)
        await topicsPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const topicsPage = new TopicsSwePage(page)
        await topicsPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const topicsPage = new TopicsSwePage(page)
        await topicsPage.goTo()

        await topicsPage.checkNoHorizontalScroll()
    })
})
