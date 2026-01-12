import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

import { AnyPage } from './anyPage'

export class BlogPostPage extends AnyPage {
    readonly url: string
    readonly title: string
    readonly titleLocator: Locator
    readonly date: Locator
    readonly tagsAndUrls: [Locator, string][]
    readonly shareFacebook: Locator
    readonly shareBluesky: Locator
    readonly shareThreads: Locator
    readonly shareLinkedIn: Locator
    readonly otherPostsTitle: Locator

    constructor(
        page: Page,
        url = '/blogi/sote-on-hyvinvointiyhteiskunnan-kulmakivi/',
        title = 'Sote on hyvinvointi­yhteiskunnan kulmakivi',
        date = /20.12.2021/i,
        tags: [string | RegExp, string][] = [
            [/#aluevaalit 2022/i, '/kategoria/aluevaalit2022/'],
            [/#soteuudistus/i, '/kategoria/soteuudistus/'],
            [/#Kirkkonummi/i, '/kategoria/kirkkonummi/'],
        ]
    ) {
        super(page)
        this.url = url
        this.title = title
        this.titleLocator = page.getByRole('heading', { name: title })
        this.date = page.getByText(date)
        this.tagsAndUrls = tags.map(([tag, url]) => [page.getByRole('link', { name: tag }).first(), url])

        this.shareFacebook = page.getByRole('link', { name: `Jaa kirjoitus "${title}" Facebookissa` })
        this.shareBluesky = page.getByRole('link', { name: `Jaa kirjoitus "${title}" Blueskyssa` })
        this.shareThreads = page.getByRole('link', { name: `Jaa kirjoitus "${title}" Threadsissä` })
        this.shareLinkedIn = page.getByRole('link', { name: `Jaa kirjoitus "${title}" LinkedInissä` })
        this.otherPostsTitle = page.getByRole('heading', { name: /Muita kirjoituksia/i })
    }

    async goTo() {
        await this.page.goto(this.url)

        // Wait to ensure we are at the correct page
        await expect(this.titleLocator).toBeVisible()
    }

    async checkContent() {
        await Promise.all(this.tagsAndUrls.map(([tag, url]) => expect(tag).toHaveAttribute('href', url)))

        await expect(this.shareFacebook).toHaveAttribute(
            'href',
            `https://www.facebook.com/sharer/sharer.php?u=https://laurilavanti.fi${this.url}`
        )
        await expect(this.shareThreads).toHaveAttribute(
            'href',
            `https://threads.com/intent/post?text=${encodeURI(this.title)}%20https://laurilavanti.fi${this.url}`
        )
        await expect(this.shareBluesky).toHaveAttribute(
            'href',
            `https://bsky.app/intent/compose?text=${encodeURI(this.title)}%20https://laurilavanti.fi${this.url}`
        )
        await expect(this.shareLinkedIn).toHaveAttribute(
            'href',
            `https://www.linkedin.com/sharing/share-offsite/?url=https://laurilavanti.fi${this.url}`
        )

        await expect(this.otherPostsTitle).toBeVisible()
    }
}
