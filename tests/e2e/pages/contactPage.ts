import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class ContactPage extends AnyPage {
    readonly number: Locator
    readonly bluesky: Locator
    readonly facebook: Locator
    readonly instagram: Locator
    readonly linkedIn: Locator
    readonly mastodon: Locator
    readonly threads: Locator
    readonly tiktok: Locator

    constructor(page: Page) {
        super(page)
        this.number = page.getByText('040 761 7605')
        this.bluesky = page.getByRole('link', { name: /Bluesky @laurilavanti.fi/i }).first()
        this.facebook = page.getByRole('link', { name: /Facebook laurilavanti/i }).first()
        this.instagram = page.getByRole('link', { name: /Instagram @laurilavanti/i }).first()
        this.linkedIn = page.getByRole('link', { name: /LinkedIn laurilavanti/i }).first()
        this.mastodon = page.getByRole('link', { name: /Mastodon @laurilavanti@mastodontti.fi/i }).first()
        this.threads = page.getByRole('link', { name: /Threads @laurilavanti/i }).first()
        this.tiktok = page.getByRole('link', { name: /TikTok @laurilavanti/i }).first()
    }

    async goTo() {
        await this.goToNavLink(this.navLinkContactInfo)

        // Wait to ensure we are at the correct page
        await expect(this.number).toBeVisible()
    }

    async checkContent() {
        await expect(this.bluesky).toHaveAttribute('href', 'https://bsky.app/profile/laurilavanti.fi')
        await expect(this.facebook).toHaveAttribute('href', 'https://www.facebook.com/laurilavanti')
        await expect(this.instagram).toHaveAttribute('href', 'https://www.instagram.com/laurilavanti/')
        await expect(this.linkedIn).toHaveAttribute('href', 'https://www.linkedin.com/in/laurilavanti')
        await expect(this.mastodon).toHaveAttribute('href', 'https://mastodontti.fi/@laurilavanti')
        await expect(this.threads).toHaveAttribute('href', 'https://www.threads.com/@laurilavanti')
        await expect(this.tiktok).toHaveAttribute('href', 'https://www.tiktok.com/@laurilavanti')
    }
}
