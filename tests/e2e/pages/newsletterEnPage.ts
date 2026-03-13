import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class NewsletterEnPage extends AnyPage {
    readonly pageTitle: Locator
    readonly emailInput: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        super(page)
        this.pageTitle = page.getByRole('heading', { level: 1 })
        this.emailInput = page.locator('input[type="email"]')
        this.submitButton = page.getByRole('button', { name: 'Subscribe' }).first()
    }

    async goTo() {
        await this.page.goto('/en/newsletter/')

        await expect(this.pageTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.emailInput).toBeVisible()
        await expect(this.submitButton).toBeVisible()
    }
}
