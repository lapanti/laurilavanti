import type { Page } from '@playwright/test'

import { expect, test } from '@playwright/test'

import { AboutPage } from './pages/aboutPage'

const captureExpandedStateBeforeNavigation = async (page: Page) => {
    await page.evaluate(() => {
        document.addEventListener(
            'click',
            (event) => {
                const target = event.target as Element | null
                if (!target?.closest('#mobile-primary-navigation a')) return

                event.preventDefault()
                const button = document.querySelector('[aria-controls="mobile-primary-navigation"]')
                document.documentElement.dataset.menuExpandedAtNavigation = button?.getAttribute('aria-expanded') ?? ''
            },
            { once: true }
        )
    })
}

test.describe('Mobile navigation disclosure', () => {
    test('matches closed and open accessibility trees', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        test.skip(!aboutPage.isMobile, 'Mobile-only behavior')
        await aboutPage.goTo()

        await expect(page.getByRole('banner')).toMatchAriaSnapshot()
        await aboutPage.openMainNavigation()
        await expect(page.getByRole('banner')).toMatchAriaSnapshot()
    })

    test('hides closed links and restores button focus after Escape', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        test.skip(!aboutPage.isMobile, 'Mobile-only behavior')
        await aboutPage.goTo()

        const menu = page.locator('#mobile-primary-navigation')
        await expect(aboutPage.navButton).toHaveAccessibleName('Avaa valikko')
        await expect(aboutPage.navButton).toHaveAttribute('aria-expanded', 'false')
        await expect(menu).toBeHidden()

        await aboutPage.openMainNavigation()

        await expect(aboutPage.navButton).toHaveAccessibleName('Sulje valikko')
        await expect(menu).toBeVisible()
        await aboutPage.checkMainNavigationLinks()

        await page.keyboard.press('Escape')

        await expect(aboutPage.navButton).toHaveAccessibleName('Avaa valikko')
        await expect(aboutPage.navButton).toHaveAttribute('aria-expanded', 'false')
        await expect(menu).toBeHidden()
        await expect(aboutPage.navButton).toBeFocused()
    })

    test('closes before pointer and keyboard link activation', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        test.skip(!aboutPage.isMobile, 'Mobile-only behavior')
        await aboutPage.goTo()

        const menu = page.locator('#mobile-primary-navigation')
        for (const activate of [
            () => aboutPage.navLinkBlog.click(),
            async () => {
                await aboutPage.navLinkBlog.focus()
                await page.keyboard.press('Enter')
            },
        ]) {
            await aboutPage.openMainNavigation()
            await captureExpandedStateBeforeNavigation(page)

            await activate()

            await expect(page.locator('html')).toHaveAttribute('data-menu-expanded-at-navigation', 'false')
            await expect(aboutPage.navButton).toHaveAttribute('aria-expanded', 'false')
            await expect(menu).toBeHidden()
            await page.locator('html').evaluate((element) => delete element.dataset.menuExpandedAtNavigation)
        }
    })
})
