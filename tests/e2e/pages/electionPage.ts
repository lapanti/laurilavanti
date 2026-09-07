import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class ElectionPage extends AnyPage {
    readonly electionTitle: Locator
    readonly briefPlate: Locator

    constructor(page: Page) {
        super(page)
        this.electionTitle = page.getByRole('heading', { level: 1 })
        this.briefPlate = page.locator('#lyhyesti')
    }

    async goTo() {
        await this.page.goto('/fi/eduskuntavaalit/')

        // Wait to ensure we are at the correct page
        await expect(this.electionTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.briefPlate).toBeVisible()
    }
}
