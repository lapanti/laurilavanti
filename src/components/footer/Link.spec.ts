import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Link from './Link.astro'

describe('<Link />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Follow us on GitHub (avautuu uudessa välilehdessä)',
                icon: 'bluesky',
                title: 'Follow us on GitHub',
                url: 'https://github.com/example',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Follow us on GitHub (avautuu uudessa välilehdessä)',
                icon: 'facebook',
                title: 'Follow us on GitHub',
                url: 'https://github.com/example',
            },
        })

        expect(getByRole(result, 'link')).toBeDefined()
    })

    it('should set correct href attribute', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'My GitHub (avautuu uudessa välilehdessä)',
                icon: 'threads',
                title: 'My GitHub',
                url: 'https://github.com/myprofile',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('href', 'https://github.com/myprofile')
    })

    it('should set aria-label attribute', async () => {
        const ariaLabel = 'Follow on LinkedIn (avautuu uudessa välilehdessä)'
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel,
                icon: 'linkedin',
                title: 'Follow on LinkedIn',
                url: 'https://linkedin.com/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('aria-label', ariaLabel)
    })

    it('should set title attribute', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Visit my Mastodon profile (avautuu uudessa välilehdessä)',
                icon: 'mastodon',
                title: 'Visit my Mastodon profile',
                url: 'https://mastodon.social/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('title', 'Visit my Mastodon profile')
    })

    it('should have rel attribute with correct values', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Bluesky (avautuu uudessa välilehdessä)',
                icon: 'bluesky',
                title: 'Bluesky',
                url: 'https://bsky.app/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('rel', 'me noopener noreferrer')
    })

    it('should open link in new tab', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Instagram (avautuu uudessa välilehdessä)',
                icon: 'instagram',
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('target', '_blank')
    })

    it('should render list item element', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Instagram (avautuu uudessa välilehdessä)',
                icon: 'instagram',
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })

    it('should render without icon', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Visit our website (avautuu uudessa välilehdessä)',
                title: 'Visit our website',
                url: 'https://example.com',
            },
        })

        expect(result.firstChild).toBeDefined()
        expect(getByRole(result, 'link')).toBeDefined()
    })

    it('should render icon element', async () => {
        const result = await renderAstroComponent(Link, {
            props: {
                ariaLabel: 'Facebook (avautuu uudessa välilehdessä)',
                icon: 'facebook',
                title: 'Facebook',
                url: 'https://facebook.com/example',
            },
        })

        expect(result.querySelector('svg')).toBeDefined()
    })

    it.each([['bluesky'], ['facebook'], ['instagram'], ['linkedin'], ['mastodon'], ['threads'], ['tiktok']])(
        'should support icon for %s',
        async (icon) => {
            const result = await renderAstroComponent(Link, {
                props: {
                    ariaLabel: `Follow on ${icon} (avautuu uudessa välilehdessä)`,
                    icon,
                    title: `Follow on ${icon}`,
                    url: `https://${icon}.com/example`,
                },
            })

            expect(getByRole(result, 'link')).toBeDefined()
        }
    )
})
