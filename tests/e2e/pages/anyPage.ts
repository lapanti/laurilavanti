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
        this.navButton = page.getByRole('checkbox', { name: /Avaa valikko/i })
        this.navLinkAboutMe = page.getByRole('link', { name: /Kuka\?/i })
        this.navLinkBlog = page.getByRole('link', { name: /Blogi/i })
        this.navLinkContactInfo = page.getByRole('link', { name: /Ota yhteyttä/i })
        this.navLinkAboutMeSwe = page.getByRole('link', { name: /🇸🇪/i })
        this.navLinkAboutMeEn = page.getByRole('link', { name: /🇬🇧/i })
        this.footerFacebookLink = page
            .locator('footer')
            .locator('a[aria-label="Lauri Lavanti palvelussa Facebook (linkki aukeaa uudessa välilehdessä)"]')
        this.footerBlueskyLink = page
            .locator('footer')
            .locator('a[aria-label="Lauri Lavanti palvelussa Bluesky (linkki aukeaa uudessa välilehdessä)"]')
        this.footerThreadsLink = page
            .locator('footer')
            .locator('a[aria-label="Lauri Lavanti palvelussa Threads (linkki aukeaa uudessa välilehdessä)"]')
        this.footerInstagramLink = page
            .locator('footer')
            .locator('a[aria-label="Lauri Lavanti palvelussa Instagram (linkki aukeaa uudessa välilehdessä)"]')
        this.footerLinkedInLink = page
            .locator('footer')
            .locator('a[aria-label="Lauri Lavanti palvelussa LinkedIn (linkki aukeaa uudessa välilehdessä)"]')
        this.footerMastodonLink = page
            .locator('footer')
            .locator('a[aria-label="Lauri Lavanti palvelussa Mastodon (linkki aukeaa uudessa välilehdessä)"]')
        this.footerTikTokLink = page
            .locator('footer')
            .locator('a[aria-label="Lauri Lavanti palvelussa TikTok (linkki aukeaa uudessa välilehdessä)"]')
    }

    async openMainNavigation() {
        await expect(this.navButton).not.toBeChecked()
        await this.navButton.click()
        await expect(this.navButton).toBeChecked()
    }

    async checkMainNavigationLinks() {
        await expect(this.navLinkAboutMe).toHaveAttribute('href', '/minusta/')
        await expect(this.navLinkBlog).toHaveAttribute('href', '/blogi/')
        await expect(this.navLinkContactInfo).toHaveAttribute('href', '/ota-yhteytta/')
        await expect(this.navLinkAboutMeSwe).toHaveAttribute('href', '/om-mig/')
        await expect(this.navLinkAboutMeEn).toHaveAttribute('href', '/about-me/')
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
        await expect(this.footerFacebookLink).toHaveAttribute('href', 'https://www.facebook.com/laurilavanti')
        await expect(this.footerBlueskyLink).toHaveAttribute('href', 'https://bsky.app/profile/laurilavanti.fi')
        await expect(this.footerThreadsLink).toHaveAttribute('href', 'https://www.threads.com/@laurilavanti')
        await expect(this.footerInstagramLink).toHaveAttribute('href', 'https://www.instagram.com/laurilavanti/')
        await expect(this.footerLinkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/laurilavanti')
        await expect(this.footerMastodonLink).toHaveAttribute('href', 'https://mastodontti.fi/@laurilavanti')
        await expect(this.footerTikTokLink).toHaveAttribute('href', 'https://www.tiktok.com/@laurilavanti')
    }

    async testScreenshot() {
        await expect(this.page).toHaveScreenshot()
    }
}
