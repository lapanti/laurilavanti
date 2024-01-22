import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class HomePage extends AnyPage {
    readonly mainTitle: Locator
    readonly latestTitle: Locator

    constructor(page: Page) {
        super(page)
        this.mainTitle = page.getByRole('heading', { name: /Lauri Lavanti/i })
        this.latestTitle = page.getByRole('heading', { name: /Uusimmat kirjoitukset/i })
    }

    async goHome() {
        await this.page.goto('/')

        // Wait to ensure we are at the correct page
        await expect(this.mainTitle).toBeVisible()
    }

    async checkTitles() {
        await expect(this.latestTitle).toBeVisible()

        await this.checkMainNavigation()
        await this.checkFooter()
    }
}
