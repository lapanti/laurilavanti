import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class LangSwapPage extends AnyPage {
    readonly langLinkSv: Locator
    readonly langLinkEn: Locator
    readonly langLinkFi: Locator

    constructor(page: Page) {
        super(page)
        const navIdx = this.isMobile ? 0 : 1
        this.langLinkSv = page.locator('a[data-switch-to-lang="sv"]').nth(navIdx)
        this.langLinkEn = page.locator('a[data-switch-to-lang="en"]').nth(navIdx)
        this.langLinkFi = page.locator('a[data-switch-to-lang="fi"]').nth(navIdx)
    }

    async goTo(url: string) {
        await this.page.goto(url)
        await expect(this.page.getByRole('heading', { level: 1 })).toBeVisible()
    }

    async getLangLinkHref(link: Locator) {
        return link.getAttribute('href')
    }
}
