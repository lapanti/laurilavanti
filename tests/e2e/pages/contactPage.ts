import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class ContactPage extends AnyPage {
    readonly email: Locator
    readonly facebook: Locator
    readonly twitter: Locator

    constructor(page: Page) {
        super(page)
        this.email = page.getByText('lauri.lavanti@kirkkonummi.fi')
        this.facebook = page.getByRole('link', { name: /Facebook/i }).first()
        this.twitter = page.getByRole('link', { name: /Twitter/i }).first()
    }

    async goTo() {
        await this.goToNavLink(this.navLinkContactInfo)
    }

    async checkContent() {
        await expect(this.email).toBeVisible()

        await expect(this.facebook).toHaveAttribute('href', 'https://www.facebook.com/laurilavanti')
        await expect(this.twitter).toHaveAttribute('href', 'https://twitter.com/laurilavanti')

        await this.checkFooter()
    }
}
