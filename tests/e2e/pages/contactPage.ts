import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class ContactPage extends AnyPage {
    readonly email: Locator
    readonly facebook: Locator
    readonly bluesky: Locator
    readonly instagram: Locator
    readonly linkedIn: Locator

    constructor(page: Page) {
        super(page)
        this.email = page.getByText('lauri.lavanti@kirkkonummi.fi')
        this.facebook = page.getByRole('link', { name: /Facebook/i }).first()
        this.bluesky = page.getByRole('link', { name: /Bluesky/i }).first()
        this.instagram = page.getByRole('link', { name: /Instagram/i }).first()
        this.linkedIn = page.getByRole('link', { name: /LinkedIn/i }).first()
    }

    async goTo() {
        await this.goToNavLink(this.navLinkContactInfo)

        // Wait to ensure we are at the correct page
        await expect(this.email).toBeVisible()
    }

    async checkContent() {
        await expect(this.facebook).toHaveAttribute('href', 'https://www.facebook.com/laurilavanti')
        await expect(this.bluesky).toHaveAttribute('href', 'https://bsky.app/profile/laurilavanti.fi')
        await expect(this.instagram).toHaveAttribute('href', 'https://www.instagram.com/laurilavanti/')
        await expect(this.linkedIn).toHaveAttribute('href', 'https://www.linkedin.com/in/lapanti')

        await this.checkFooter()
    }
}
