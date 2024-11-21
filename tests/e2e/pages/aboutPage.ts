import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutPage extends AnyPage {
    readonly aboutMeTitle: Locator
    readonly positionsTitle: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeTitle = page.getByRole('heading', { name: /Lauri Lavanti — Liberaalia ja kestävää politiikkaa/i })
        this.positionsTitle = page.getByRole('heading', { name: /Luottamustoimet/i })
    }

    async goTo() {
        await this.goToNavLink(this.navLinkAboutMe)

        // Wait to ensure we are at the correct page
        await expect(this.aboutMeTitle).toBeVisible()
    }

    async checkContent() {
        await expect(this.positionsTitle).toBeVisible()

        await this.checkFooter()
    }
}
