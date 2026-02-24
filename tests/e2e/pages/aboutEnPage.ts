import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutEnPage extends AnyPage {
    readonly aboutMeEnTitle: Locator
    readonly summaryBox: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeEnTitle = page.getByRole('heading', {
            name: /At the intersection between technology and society/i,
        })
        this.summaryBox = page.getByRole('complementary', { name: /Facts about Lauri/i })
    }

    async goTo() {
        await this.page.goto('/about-me/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeEnTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.summaryBox).toBeVisible()
    }
}
