import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

export class AnyPage {
    readonly page: Page
    readonly navOpenButton: Locator
    readonly navCloseButton: Locator
    readonly navLinkAboutMe: Locator
    readonly navLinkBlog: Locator
    readonly navLinkContactInfo: Locator
    readonly footerFacebookLink: Locator
    readonly footerTwitterLink: Locator
    readonly footerLinkedInLink: Locator

    constructor(page: Page) {
        this.page = page
        this.navOpenButton = page.getByRole('button', { name: /Open navigation menu/i })
        this.navCloseButton = page.getByRole('button', { name: /Close navigation menu/i })
        this.navLinkAboutMe = page.getByRole('link', { name: /Minusta/i })
        this.navLinkBlog = page.getByRole('link', { name: /Blogi/i })
        this.navLinkContactInfo = page.getByRole('link', { name: /Ota yhteyttä/i })
        this.footerFacebookLink = page.locator('footer').locator('a[title="Facebook"]')
        this.footerTwitterLink = page.locator('footer').locator('a[title="Twitter"]')
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

        await this.openMainNavigation()

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
        await this.openMainNavigation()

        await this.checkMainNavigationLinks()

        await this.closeMainNavigation()
    }

    async checkFooter() {
        await expect(this.footerFacebookLink).toHaveAttribute('href', 'https://www.facebook.com/laurilavanti')
        await expect(this.footerTwitterLink).toHaveAttribute('href', 'https://twitter.com/laurilavanti')
        await expect(this.footerLinkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/lapanti')
    }

    async checkFundamentals() {
        await this.checkMainNavigation()
        await this.checkFooter()
    }

    async testScreenshot() {
        await expect(this.page).toHaveScreenshot()
    }
}
