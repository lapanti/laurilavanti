import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class RecommendationsSwePage extends AnyPage {
    readonly recommendationsList: Locator
    readonly pageTitle: Locator

    constructor(page: Page) {
        super(page)
        this.pageTitle = page.getByRole('heading', { level: 1 })
        this.recommendationsList = page.locator('main ul').last()
    }

    async goTo() {
        await this.page.goto('/sv/recommendations/')

        // Wait to ensure we are at the correct page
        await expect(this.pageTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.recommendationsList).toBeVisible()
    }
}
