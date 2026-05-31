import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class BlogSwePage extends AnyPage {
    readonly title: Locator
    readonly articles: Locator

    constructor(page: Page) {
        super(page)
        this.title = page.getByRole('heading', { level: 1 })
        this.articles = page.locator('article[aria-label]')
    }

    async goTo() {
        await this.page.goto('/sv/blog/')

        // Wait to ensure we are at the correct page
        await expect(this.title).toBeVisible()
    }

    async checkContent() {
        await expect(this.articles.first()).toBeVisible()
        await expect(this.articles.first().getByRole('link').first()).toBeVisible()
        await expect(this.articles.first().getByRole('heading').first()).toBeVisible()
    }
}
