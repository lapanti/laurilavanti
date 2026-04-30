import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class TopicsEnPage extends AnyPage {
    readonly pageTitle: Locator
    readonly topicHeadings: Locator

    constructor(page: Page) {
        super(page)
        this.pageTitle = page.getByRole('heading', { level: 1 })
        this.topicHeadings = page.getByRole('main').getByRole('heading', { level: 2 })
    }

    async goTo() {
        await this.page.goto('/en/topics/')

        await expect(this.pageTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.topicHeadings).toHaveCount(12)
    }
}
