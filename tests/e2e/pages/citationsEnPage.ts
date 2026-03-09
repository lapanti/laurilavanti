import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class CitationsEnPage extends AnyPage {
    readonly citationsList: Locator
    readonly pageTitle: Locator
    readonly summaryBox: Locator

    constructor(page: Page) {
        super(page)
        this.pageTitle = page.getByRole('heading', { level: 1 })
        this.summaryBox = page.getByRole('complementary')
        this.citationsList = page.locator('main ul').last()
    }

    async goTo() {
        await this.page.goto('/en/citations/')

        // Wait to ensure we are at the correct page
        await expect(this.pageTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.summaryBox).toBeVisible()
        await expect(this.citationsList).toBeVisible()
    }
}
