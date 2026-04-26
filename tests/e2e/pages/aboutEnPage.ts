import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutEnPage extends AnyPage {
    readonly aboutMeEnTitle: Locator
    readonly summaryBox: Locator
    readonly summaryToggle: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeEnTitle = page.getByRole('heading', { level: 1 })
        this.summaryBox = page.getByRole('complementary')
        this.summaryToggle = page.getByRole('button', { name: 'More' })
    }

    async goTo() {
        await this.page.goto('/en/about/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeEnTitle).toBeVisible()
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
