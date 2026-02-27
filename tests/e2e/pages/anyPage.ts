import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

export class AnyPage {
    readonly page: Page
    readonly isMobile: boolean
    readonly navButton: Locator
    readonly navLinkAboutMe: Locator
    readonly navLinkBlog: Locator
    readonly navLinkContactInfo: Locator
    readonly navLinkAboutMeSwe: Locator
    readonly navLinkAboutMeEn: Locator
    readonly footerFacebookLink: Locator
    readonly footerBlueskyLink: Locator
    readonly footerThreadsLink: Locator
    readonly footerInstagramLink: Locator
    readonly footerLinkedInLink: Locator
    readonly footerMastodonLink: Locator
    readonly footerTikTokLink: Locator

    constructor(page: Page) {
        this.page = page
        this.isMobile = (page.viewportSize()?.width ?? 0) < 1200
        /*
         * MobileMenu is rendered before DesktopMenu in the DOM.
         * On desktop the mobile container is display:none (nth 1 → desktop link).
         * On mobile the desktop container is display:none (nth 0 → mobile link).
         */
        const navIdx = this.isMobile ? 0 : 1
        this.navButton = page.locator('header input[type="checkbox"]')
        this.navLinkAboutMe = page.locator('a[href="/fi/about/"]').nth(navIdx)
        this.navLinkBlog = page.locator('a[href="/fi/blog/"]').nth(navIdx)
        this.navLinkContactInfo = page.locator('a[href="/fi/contact/"]').nth(navIdx)
        this.navLinkAboutMeSwe = page.locator('a[href="/sv/"]').nth(navIdx)
        this.navLinkAboutMeEn = page.locator('a[href="/en/"]').nth(navIdx)
        this.footerFacebookLink = page.locator('footer a[href*="facebook.com"]')
        this.footerBlueskyLink = page.locator('footer a[href*="bsky.app"]')
        this.footerThreadsLink = page.locator('footer a[href*="threads.com"]')
        this.footerInstagramLink = page.locator('footer a[href*="instagram.com"]')
        this.footerLinkedInLink = page.locator('footer a[href*="linkedin.com"]')
        this.footerMastodonLink = page.locator('footer a[href*="mastodon"]')
        this.footerTikTokLink = page.locator('footer a[href*="tiktok.com"]')
    }

    async openMainNavigation() {
        await expect(this.navButton).not.toBeChecked()
        await this.navButton.click()
        await expect(this.navButton).toBeChecked()
    }

    async checkMainNavigationLinks() {
        await expect(this.navLinkAboutMe).toBeVisible()
        await expect(this.navLinkBlog).toBeVisible()
        await expect(this.navLinkContactInfo).toBeVisible()
        await expect(this.navLinkAboutMeSwe).toBeVisible()
        await expect(this.navLinkAboutMeEn).toBeVisible()
    }

    async goToNavLink(navLink: Locator) {
        await this.page.goto('/')

        if (this.isMobile) {
            await this.openMainNavigation()
        }

        await this.checkMainNavigationLinks()

        await expect(navLink).toBeVisible()
        await navLink.click()
    }

    async closeMainNavigation() {
        await expect(this.navButton).toBeChecked()
        await this.navButton.click()
        await expect(this.navButton).not.toBeChecked()
    }

    async checkMainNavigation() {
        if (this.isMobile) {
            await this.openMainNavigation()
        }

        await this.checkMainNavigationLinks()

        if (this.isMobile) {
            await this.closeMainNavigation()
        }
    }

    async checkFooter() {
        await expect(this.footerFacebookLink).toBeVisible()
        await expect(this.footerBlueskyLink).toBeVisible()
        await expect(this.footerThreadsLink).toBeVisible()
        await expect(this.footerInstagramLink).toBeVisible()
        await expect(this.footerLinkedInLink).toBeVisible()
        await expect(this.footerMastodonLink).toBeVisible()
        await expect(this.footerTikTokLink).toBeVisible()
    }
}
