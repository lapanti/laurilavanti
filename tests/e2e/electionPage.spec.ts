import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import-x/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { ElectionPage } from './pages/electionPage'

test.describe('Election Page', () => {
    test('should render', async ({ page }) => {
        const electionPage = new ElectionPage(page)
        await electionPage.goTo()

        await electionPage.checkContent()
    })

    test('should match aria snapshot', async ({ page }) => {
        const electionPage = new ElectionPage(page)
        await electionPage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const electionPage = new ElectionPage(page)
        await electionPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const electionPage = new ElectionPage(page)
        await electionPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const electionPage = new ElectionPage(page)
        await electionPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
