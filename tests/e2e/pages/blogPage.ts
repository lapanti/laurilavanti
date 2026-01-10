import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class BlogPage extends AnyPage {
    readonly title: Locator
    readonly linksToBlogs: Locator

    constructor(page: Page) {
        super(page)
        this.title = page.getByRole('heading', { name: /Blogi/i })
        this.linksToBlogs = page.locator('a[href*="/blogi/"]')
    }

    async goTo() {
        await this.goToNavLink(this.navLinkBlog)

        // Wait to ensure we are at the correct page
        await expect(this.title).toBeVisible()
    }

    async checkContent() {
        expect(await this.linksToBlogs.count()).toBeGreaterThanOrEqual(2)

        await this.checkFooter()
    }
}
