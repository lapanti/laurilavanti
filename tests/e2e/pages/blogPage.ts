import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class BlogPage extends AnyPage {
    readonly title: Locator
    readonly linksToBlogs: Locator

    constructor(page: Page) {
        super(page)
        this.title = page.getByRole('heading', { level: 1 })
        this.linksToBlogs = page.locator('a[href*="/fi/blog/"]')
    }

    async goTo() {
        await this.page.goto('/fi/blog/')

        // Wait to ensure we are at the correct page
        await expect(this.title).toBeVisible()
    }

    async checkContent() {
        expect(await this.linksToBlogs.count()).toBeGreaterThanOrEqual(2)
    }
}
