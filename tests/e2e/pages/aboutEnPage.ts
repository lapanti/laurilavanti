import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutEnPage extends AnyPage {
    readonly aboutMeEnTitle: Locator
    readonly briefPlate: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeEnTitle = page.getByRole('heading', { level: 1 })
        this.briefPlate = page.locator('#brief')
    }

    async goTo() {
        await this.page.goto('/en/about/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeEnTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.briefPlate).toBeVisible()
    }
}
