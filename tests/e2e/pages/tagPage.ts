import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class TagPage extends AnyPage {
    readonly url: string
    readonly title: Locator
    readonly minNumberOfArtices: number
    readonly articles: Locator

    constructor(page: Page, url = '/kategoria/kirkkonummi', title = 'Kirkkonummi', minNumberOfArticles = 2) {
        super(page)
        this.url = url
        this.title = page.getByRole('heading', { name: title, exact: true })
        this.minNumberOfArtices = minNumberOfArticles
        this.articles = page.getByRole('article')
    }

    async goTo() {
        await this.page.goto(this.url)
    }

    async checkContent() {
        await expect(this.title).toBeVisible()

        await expect(await this.articles.count()).toBeGreaterThanOrEqual(this.minNumberOfArtices)

        await this.checkFundamentals()
    }
}
