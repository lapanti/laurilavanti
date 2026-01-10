import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class HomePage extends AnyPage {
    readonly mainTitle: Locator
    readonly secondaryTitle: Locator

    constructor(page: Page) {
        super(page)
        this.mainTitle = page.getByRole('heading', { level: 1, name: /Lauri Lavanti/i })
        this.secondaryTitle = page.getByRole('heading', { level: 2, name: /Digitalisaatio arjessa/i })
    }

    async goHome() {
        await this.page.goto('/')

        // Wait to ensure we are at the correct page
        await expect(this.mainTitle).toBeVisible()
    }

    async checkTitles() {
        await expect(this.mainTitle).toBeVisible()

        await expect(this.secondaryTitle).toBeVisible()

        await this.checkMainNavigation()
        await this.checkFooter()
    }
}
