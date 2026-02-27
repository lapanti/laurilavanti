import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class NotFoundPage extends AnyPage {
    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = page.getByRole('heading', { level: 1 })
    }

    async goTo() {
        await this.page.goto('/this-page-does-not-exist/')

        // Wait to ensure we are at the correct page
        await expect(this.title).toBeVisible()
    }

    async checkContent() {
        await expect(this.title).toBeVisible()
    }
}
