import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class ContactEnPage extends AnyPage {
    readonly heading: Locator
    readonly bluesky: Locator
    readonly facebook: Locator
    readonly instagram: Locator
    readonly linkedIn: Locator
    readonly mastodon: Locator
    readonly threads: Locator
    readonly tiktok: Locator

    constructor(page: Page) {
        super(page)
        this.heading = page.getByRole('heading', { level: 1 })
        this.bluesky = page.locator('main a[href*="bsky.app"]').first()
        this.facebook = page.locator('main a[href*="facebook.com"]').first()
        this.instagram = page.locator('main a[href*="instagram.com"]').first()
        this.linkedIn = page.locator('main a[href*="linkedin.com"]').first()
        this.mastodon = page.locator('main a[href*="mastodon"]').first()
        this.threads = page.locator('main a[href*="threads.com"]').first()
        this.tiktok = page.locator('main a[href*="tiktok.com"]').first()
    }

    async goTo() {
        await this.page.goto('/en/contact/')

        // Wait to ensure we are at the correct page
        await expect(this.heading).toBeVisible()
    }

    async checkContent() {
        await expect(this.bluesky).toBeVisible()
        await expect(this.facebook).toBeVisible()
        await expect(this.instagram).toBeVisible()
        await expect(this.linkedIn).toBeVisible()
        await expect(this.mastodon).toBeVisible()
        await expect(this.threads).toBeVisible()
        await expect(this.tiktok).toBeVisible()
    }
}
