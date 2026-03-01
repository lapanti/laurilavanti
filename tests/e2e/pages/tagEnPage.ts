import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class TagEnPage extends AnyPage {
    readonly url: string
    readonly title: Locator
    readonly minNumberOfArticles: number
    readonly articles: Locator

    constructor(page: Page, url = '/en/category/kirkkonummi/', minNumberOfArticles = 1) {
        super(page)
        this.url = url
        this.title = page.getByRole('heading', { level: 1 })
        this.minNumberOfArticles = minNumberOfArticles
        this.articles = page.getByRole('article')
    }

    async goTo() {
        await this.page.goto(this.url)

        // Wait to ensure we are at the correct page
        await expect(this.title).toBeVisible()
    }

    async checkContent() {
        expect(await this.articles.count()).toBeGreaterThanOrEqual(this.minNumberOfArticles)
    }
}
