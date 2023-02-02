import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class BlogPage extends AnyPage {
    readonly title: Locator
    readonly articles: Locator
    readonly linksToBlogs: Locator

    constructor(page: Page) {
        super(page)
        this.title = page.getByRole('heading', { name: /Blogi/i })
        this.articles = page.getByRole('article')
        this.linksToBlogs = page.locator('a[href*="/blogi/"]')
    }

    async goTo() {
        await this.goToNavLink(this.navLinkBlog)
    }

    async checkContent() {
        await expect(this.title).toBeVisible()

        await this.checkFundamentals()

        await expect(await this.articles.count()).toBeGreaterThanOrEqual(2)
        await expect(await this.linksToBlogs.count()).toBeGreaterThanOrEqual(2)
    }
}
