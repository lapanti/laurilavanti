import AxeBuilder from '@axe-core/playwright' /* eslint-disable-line import/no-named-as-default */
import test from '@playwright/test'

import { checkSiteImprove } from './helpers/siteimprove'
import { NotFoundPage } from './pages/notFoundPage'

test.describe('404 Not Found Page', () => {
    test('should render', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await notFoundPage.checkContent()
    })

    test('should match aria snapshot', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await test.expect(page.getByRole('main')).toMatchAriaSnapshot()
    })

    test('should pass accessibility test', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        test.expect(accessibilityScanResults.violations).toEqual([])
    })

    test('should pass siteimprove check', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await checkSiteImprove(page)
    })

    test('should match screenshot', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await test.expect(page).toHaveScreenshot()
    })

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await notFoundPage.checkNoHorizontalScroll()
    })
})

test.describe('404 wrong-slug blog redirect', () => {
    test('redirects fi blog post with wrong slug to canonical URL', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goToWrongBlogSlug('fi', 10, 'wrong-slug')

        await test.expect(page).toHaveURL('/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/')
    })

    test('does not redirect a fully unknown URL', async ({ page }) => {
        const notFoundPage = new NotFoundPage(page)
        await notFoundPage.goTo()

        await test.expect(page).toHaveURL('/this-page-does-not-exist/')
    })
})
