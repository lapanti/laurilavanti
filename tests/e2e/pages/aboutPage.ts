import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutPage extends AnyPage {
    readonly aboutMeTitle: Locator
    readonly summaryBox: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeTitle = page.getByRole('heading', { name: /Teknologian ja yhteiskunnan rajapinnassa/i })
        this.summaryBox = page.getByRole('complementary', { name: /Faktoja Laurista/i })
    }

    async goTo() {
        await this.page.goto('/minusta/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.summaryBox).toBeVisible()
    }
}
