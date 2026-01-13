import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutEnPage extends AnyPage {
    readonly aboutMeEnTitle: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeEnTitle = page.getByRole('heading', { name: /Lauri Lavanti – .*/i })
    }

    async goTo() {
        await this.goToNavLink(this.navLinkAboutMeEn)

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeEnTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.aboutMeEnTitle).toBeVisible()
    }
}
