import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

export class AnyPage {
    readonly page: Page
    readonly isMobile: boolean
    readonly navOpenButton: Locator
    readonly navCloseButton: Locator
    readonly navLinkAboutMe: Locator
    readonly navLinkBlog: Locator
    readonly navLinkContactInfo: Locator
    readonly footerFacebookLink: Locator
    readonly footerBlueskyLink: Locator
    readonly footerInstagramLink: Locator
    readonly footerLinkedInLink: Locator

    constructor(page: Page) {
        this.page = page
        this.isMobile = (page.viewportSize()?.width ?? 0) < 1200
        this.navOpenButton = page.getByRole('button', { name: /Avaa valikko/i })
        this.navCloseButton = page.getByRole('button', { name: /Sulje valikko/i })
        this.navLinkAboutMe = page.getByRole('link', { name: /Kuka Lauri?/i })
        this.navLinkBlog = page.getByRole('link', { name: /Blogi/i })
        this.navLinkContactInfo = page.getByRole('link', { name: /Ota yhteyttä/i })
        this.footerFacebookLink = page.locator('footer').locator('a[title="Facebook"]')
        this.footerBlueskyLink = page.locator('footer').locator('a[title="Bluesky"]')
        this.footerInstagramLink = page.locator('footer').locator('a[title="Instagram"]')
        this.footerLinkedInLink = page.locator('footer').locator('a[title="LinkedIn"]')
    }

    async openMainNavigation() {
        await expect(this.navOpenButton).toBeVisible()
        await this.navOpenButton.click()
        await expect(this.navOpenButton).not.toBeVisible()
    }

    async checkMainNavigationLinks() {
        await expect(this.navLinkAboutMe).toHaveAttribute('href', '/minusta/')
        await expect(this.navLinkBlog).toHaveAttribute('href', '/blogi/')
        await expect(this.navLinkContactInfo).toHaveAttribute('href', '/ota-yhteytta/')
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
        await expect(this.navCloseButton).toBeVisible()
        await this.navCloseButton.click()
        await expect(this.navCloseButton).not.toBeVisible()
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
        await expect(this.footerInstagramLink).toHaveAttribute('href', 'https://www.instagram.com/laurilavanti/')
        await expect(this.footerLinkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/lapanti')
    }

    async testScreenshot() {
        await expect(this.page).toHaveScreenshot()
    }
}
