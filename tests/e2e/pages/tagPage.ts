import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class TagPage extends AnyPage {
    readonly url: string
    readonly title: Locator
    readonly articles: Locator

    constructor(page: Page, url = '/fi/category/kirkkonummi/') {
        super(page)
        this.url = url
        this.title = page.getByRole('heading', { level: 1 })
        this.articles = page.getByRole('article')
    }

    async goTo() {
        await this.page.goto(this.url)

        // Wait to ensure we are at the correct page
        await expect(this.title).toBeVisible()
    }

    async checkContent() {
        await expect(this.articles.first()).toBeVisible()
        await expect(this.articles.first().getByRole('link')).toBeVisible()
        await expect(this.articles.first().getByRole('heading')).toBeVisible()
    }
}
