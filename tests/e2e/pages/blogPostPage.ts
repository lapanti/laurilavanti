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
        url = '/blogi/sote-on-hyvinvointiyhteiskunnan-kulmakivi',
        title = 'Sote on hyvinvointiyhteiskunnan kulmakivi',
        date = /20.12.2021/i,
        tags: [string | RegExp, string][] = [
            [/#aluevaalit/i, '/kategoria/aluevaalit/'],
            [/#soteuudistus/i, '/kategoria/soteuudistus/'],
            [/#kirkkonummi/i, '/kategoria/kirkkonummi/'],
        ]
    ) {
        super(page)
        this.url = url
        this.title = title
        this.titleLocator = page.getByRole('heading', { name: title })
        this.date = page.getByText(date)
        this.tagsAndUrls = tags.map(([tag, url]) => [page.getByRole('link', { name: tag }).first(), url])

        this.shareFacebook = page.getByRole('link', { name: /Jaa Facebookissa/i })
        this.shareBluesky = page.getByRole('link', { name: /Jaa Blueskyssa/i })
        this.shareThreads = page.getByRole('link', { name: /Jaa Threadsissä/i })
        this.shareLinkedIn = page.getByRole('link', { name: /Jaa LinkedInissä/i })
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
            'https://www.facebook.com/sharer/sharer.php?u=https://laurilavanti.fi'
        )
        await expect(this.shareThreads).toHaveAttribute(
            'href',
            `https://threads.net/intent/post?text=${encodeURI(this.title)}%20https://laurilavanti.fi`
        )
        await expect(this.shareBluesky).toHaveAttribute(
            'href',
            `https://bsky.app/intent/compose?text=${encodeURI(this.title)}%20https://laurilavanti.fi`
        )
        await expect(this.shareLinkedIn).toHaveAttribute(
            'href',
            'https://www.linkedin.com/sharing/share-offsite/?url=https://laurilavanti.fi'
        )

        await expect(this.otherPostsTitle).toBeVisible()
    }
}
