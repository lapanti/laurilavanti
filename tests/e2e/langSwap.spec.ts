import test from '@playwright/test'

import { LangSwapPage } from './pages/langSwapPage'

test.describe('Language swap links', () => {
    test('swap from fi/about to sv/about and en/about', async ({ page }) => {
        const langSwapPage = new LangSwapPage(page)
        await langSwapPage.goTo('/fi/about/')

        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkSv)).toBe('/sv/about/')
        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkEn)).toBe('/en/about/')
    })

    test('swap from sv/about to fi/about and en/about', async ({ page }) => {
        const langSwapPage = new LangSwapPage(page)
        await langSwapPage.goTo('/sv/about/')

        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkFi)).toBe('/fi/about/')
        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkEn)).toBe('/en/about/')
    })

    test('swap from en/about to fi/about and sv/about', async ({ page }) => {
        const langSwapPage = new LangSwapPage(page)
        await langSwapPage.goTo('/en/about/')

        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkFi)).toBe('/fi/about/')
        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkSv)).toBe('/sv/about/')
    })

    test('swap from fi/blog/ to sv/blog/ and en/blog/', async ({ page }) => {
        const langSwapPage = new LangSwapPage(page)
        await langSwapPage.goTo('/fi/blog/')

        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkSv)).toBe('/sv/blog/')
        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkEn)).toBe('/en/blog/')
    })

    test('swap from a fi blog post resolves translated slugs', async ({ page }) => {
        const langSwapPage = new LangSwapPage(page)
        await langSwapPage.goTo('/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/')

        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkSv)).toBe(
            '/sv/blog/10/sote-ar-valfardssallets-hordsten/'
        )
        test.expect(await langSwapPage.getLangLinkHref(langSwapPage.langLinkEn)).toBe(
            '/en/blog/10/sote-is-the-cornerstone-of-the-welfare-society/'
        )
    })

    test('clicking the sv lang link on fi/about navigates to sv/about', async ({ page }) => {
        const langSwapPage = new LangSwapPage(page)
        await langSwapPage.goTo('/fi/about/')

        if (langSwapPage.isMobile) {
            await langSwapPage.openMainNavigation()
        }

        await langSwapPage.langLinkSv.click()
        await test.expect(page).toHaveURL('/sv/about/')
    })

    test('clicking the en lang link on fi/about navigates to en/about', async ({ page }) => {
        const langSwapPage = new LangSwapPage(page)
        await langSwapPage.goTo('/fi/about/')

        if (langSwapPage.isMobile) {
            await langSwapPage.openMainNavigation()
        }

        await langSwapPage.langLinkEn.click()
        await test.expect(page).toHaveURL('/en/about/')
    })
})
