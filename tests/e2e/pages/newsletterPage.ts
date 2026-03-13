import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class NewsletterPage extends AnyPage {
    readonly pageTitle: Locator
    readonly emailInput: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        super(page)
        this.pageTitle = page.getByRole('heading', { level: 1 })
        this.emailInput = page.locator('input[type="email"]')
        this.submitButton = page.getByRole('button', { name: 'Tilaa' }).first()
    }

    async goTo() {
        await this.page.goto('/fi/newsletter/')

        await expect(this.pageTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.emailInput).toBeVisible()
        await expect(this.submitButton).toBeVisible()
    }
}
