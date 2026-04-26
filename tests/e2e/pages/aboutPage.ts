import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutPage extends AnyPage {
    readonly aboutMeTitle: Locator
    readonly summaryBox: Locator
    readonly summaryToggle: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeTitle = page.getByRole('heading', { level: 1 })
        this.summaryBox = page.getByRole('complementary')
        this.summaryToggle = page.getByRole('button', { name: 'Lisää' })
    }

    async goTo() {
        await this.page.goto('/fi/about/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeTitle).toBeVisible()
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
