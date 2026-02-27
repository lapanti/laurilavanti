import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutEnPage extends AnyPage {
    readonly aboutMeEnTitle: Locator
    readonly summaryBox: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeEnTitle = page.getByRole('heading', { level: 1 })
        this.summaryBox = page.getByRole('complementary')
    }

    async goTo() {
        await this.page.goto('/en/about/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeEnTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.summaryBox).toBeVisible()
    }
}
