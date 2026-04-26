import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutSwePage extends AnyPage {
    readonly aboutMeSweTitle: Locator
    readonly summaryBox: Locator
    readonly summaryToggle: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeSweTitle = page.getByRole('heading', { level: 1 })
        this.summaryBox = page.getByRole('complementary')
        this.summaryToggle = page.getByRole('button', { name: 'Mer' })
    }

    async goTo() {
        await this.page.goto('/sv/about/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeSweTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.summaryBox).toBeVisible()
    }

    async checkSummaryCollapse() {
        await expect(this.summaryToggle).toBeVisible()
        await expect(this.summaryToggle).toHaveAttribute('aria-expanded', 'false')
        await this.summaryToggle.click()
        await expect(this.summaryToggle).toHaveAttribute('aria-expanded', 'true')
    }
}
