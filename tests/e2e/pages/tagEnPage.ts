import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class TagEnPage extends AnyPage {
    readonly url: string
    readonly title: Locator
    readonly articles: Locator

    constructor(page: Page, url = '/en/category/municipal-elections-2025/') {
        super(page)
        this.url = url
        this.title = page.getByRole('heading', { level: 1 })
        this.articles = page.locator('article[aria-label]')
    }

    async goTo() {
        await this.page.goto(this.url)

        // Wait to ensure we are at the correct page
        await expect(this.title).toBeVisible()
    }

    async checkContent() {
        await expect(this.articles.first()).toBeVisible()
        await expect(this.articles.first().getByRole('link').first()).toBeVisible()
        await expect(this.articles.first().getByRole('heading').first()).toBeVisible()
    }
}
