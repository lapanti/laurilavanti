import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutSwePage extends AnyPage {
    readonly aboutMeSweTitle: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeSweTitle = page.getByRole('heading', { name: /Lauri Lavanti – .*/i })
    }

    async goTo() {
        await this.page.goto('/om-mig/')

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeSweTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.aboutMeSweTitle).toBeVisible()
    }
}
