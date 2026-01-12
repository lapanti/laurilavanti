import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import SocialShare from './SocialShare.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/SocialShare.spec.ts

describe('<SocialShare />', () => {
    const shareUrl = 'https://laurilavanti.fi/blogi/vuosi-2026-on-tekoalyn'
    const title = 'Vuosi 2026 on tekoälyn'
    const ariaLabel = 'Kirjoituksen "Vuosi 2026 on tekoälyn" jakaminen sosiaalisessa mediassa'

    it('should render', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render aside', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'complementary', { name: ariaLabel.replaceAll('"', '&#34;') })).toBeDefined()
    })

    it('should render facebook link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Facebookissa` })).toBeDefined()
    })

    it('should render correct url for facebook link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Facebookissa` })).toHaveAttribute(
            'href',
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(shareUrl)}`
        )
    })

    it('should render correct rel for facebook link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Facebookissa` })).toHaveAttribute(
            'rel',
            'noopener noreferrer'
        )
    })

    it('should render correct title for facebook link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Facebookissa` })).toHaveAttribute(
            'title',
            'Jaa Facebookissa'
        )
    })

    it('should render threads link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Threadsissä` })).toBeDefined()
    })

    it('should render correct url for threads link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Threadsissä` })).toHaveAttribute(
            'href',
            `https://threads.com/intent/post?text=${encodeURI(title)}%20${encodeURI(shareUrl)}`
        )
    })

    it('should render correct rel for threads link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Threadsissä` })).toHaveAttribute(
            'rel',
            'noopener noreferrer'
        )
    })

    it('should render correct title for threads link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Threadsissä` })).toHaveAttribute(
            'title',
            'Jaa Threadsissä'
        )
    })

    it('should render bluesky link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Blueskyssa` })).toBeDefined()
    })

    it('should render correct url for bluesky link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Blueskyssa` })).toHaveAttribute(
            'href',
            `https://bsky.app/intent/compose?text=${encodeURI(title)}%20${encodeURI(shareUrl)}`
        )
    })

    it('should render correct rel for bluesky link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Blueskyssa` })).toHaveAttribute(
            'rel',
            'noopener noreferrer'
        )
    })

    it('should render correct title for bluesky link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; Blueskyssa` })).toHaveAttribute(
            'title',
            'Jaa Blueskyssa'
        )
    })

    it('should render linkedin link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; LinkedInissä` })).toBeDefined()
    })

    it('should render correct url for linkedin link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; LinkedInissä` })).toHaveAttribute(
            'href',
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(shareUrl)}`
        )
    })

    it('should render correct rel for linkedin link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; LinkedInissä` })).toHaveAttribute(
            'rel',
            'noopener noreferrer'
        )
    })

    it('should render correct title for linkedin link', async () => {
        const result = await renderAstroComponent(SocialShare, {
            props: {
                ariaLabel,
                shareUrl,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: `Jaa kirjoitus &#34;${title}&#34; LinkedInissä` })).toHaveAttribute(
            'title',
            'Jaa LinkedInissä'
        )
    })
})
