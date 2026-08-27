import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class MediaPage extends AnyPage {
    readonly galleryList: Locator
    readonly downloadLink: Locator
    readonly pageTitle: Locator

    constructor(page: Page) {
        super(page)
        this.pageTitle = page.getByRole('heading', { level: 1 })
        this.galleryList = page.locator('main ul').first()
        this.downloadLink = page.locator('main a[download]').first()
    }

    async goTo() {
        await this.page.goto('/fi/media/')

        // Wait to ensure we are at the correct page
        await expect(this.pageTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.galleryList).toBeVisible()
        await expect(this.downloadLink).toBeVisible()
    }
}
