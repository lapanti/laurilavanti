import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

export class AnyPage {
    readonly page: Page
    readonly navOpenButton: Locator
    readonly navCloseButton: Locator
    readonly navLinkAboutMe: Locator
    readonly navLinkBlog: Locator
    readonly navLinkContactInfo: Locator

    constructor(page: Page) {
        this.page = page
        this.navOpenButton = page.getByRole('button', { name: /Open navigation menu/i })
        this.navCloseButton = page.getByRole('button', { name: /Close navigation menu/i })
        this.navLinkAboutMe = page.getByRole('link', { name: /Minusta/i })
        this.navLinkBlog = page.getByRole('link', { name: /Blogi/i })
        this.navLinkContactInfo = page.getByRole('link', { name: /Ota yhteyttä/i })
    }

    async checkMainNavigation() {
        await expect(this.navOpenButton).toBeVisible()
        await this.navOpenButton.click()
        await expect(this.navOpenButton).not.toBeVisible()

        await expect(this.navLinkAboutMe).toHaveAttribute('href', '/minusta/')
        await expect(this.navLinkBlog).toHaveAttribute('href', '/blogi/')
        await expect(this.navLinkContactInfo).toHaveAttribute('href', '/ota-yhteytta/')

        await expect(this.navCloseButton).toBeVisible()
        await this.navCloseButton.click()
        await expect(this.navCloseButton).not.toBeVisible()
    }
}
