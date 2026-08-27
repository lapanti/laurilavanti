import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { MediaEnPage } from './pages/mediaEnPage'

test.describe('Media Page in English', () => {
    test('should render', async ({ page }) => {
        const mediaPage = new MediaEnPage(page)
        await mediaPage.goTo()

        await mediaPage.checkContent()
    })

    test('should match aria snapshot', async ({ page }) => {
        const mediaPage = new MediaEnPage(page)
        await mediaPage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const mediaPage = new MediaEnPage(page)
        await mediaPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const mediaPage = new MediaEnPage(page)
        await mediaPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const mediaPage = new MediaEnPage(page)
        await mediaPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })
})
