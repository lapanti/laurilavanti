import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class AboutPage extends AnyPage {
    readonly aboutMeTitle: Locator
    readonly positionsTitle: Locator

    constructor(page: Page) {
        super(page)
        this.aboutMeTitle = page.getByRole('heading', { name: /Minusta/i })
        this.positionsTitle = page.getByRole('heading', { name: /Luottamustoimet/i })
    }

    async goTo() {
        await this.page.goto('/')

        await expect(this.navOpenButton).toBeVisible()
        await this.navOpenButton.click()

        await expect(this.navLinkAboutMe).toBeVisible()
        await this.navLinkAboutMe.click()
    }

    async checkTitles() {
        await expect(this.aboutMeTitle).toBeVisible()
        await expect(this.positionsTitle).toBeVisible()
    }
}
