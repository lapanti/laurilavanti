import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import TikTokLink from './TikTokLink.astro'

describe('<TikTokLink />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'Follow us on TikTok (avautuu uudessa välilehdessä)',
                title: 'Follow us on TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'Follow us on TikTok (avautuu uudessa välilehdessä)',
                title: 'Follow us on TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link')).toBeDefined()
    })

    it('should set correct href attribute', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'My TikTok (avautuu uudessa välilehdessä)',
                title: 'My TikTok',
                url: 'https://tiktok.com/@myprofile',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('href', 'https://tiktok.com/@myprofile')
    })

    it('should set aria-label attribute', async () => {
        const ariaLabel = 'Follow on TikTok (avautuu uudessa välilehdessä)'
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel,
                title: 'Follow on TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('aria-label', ariaLabel)
    })

    it('should set title attribute', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'Visit my TikTok profile (avautuu uudessa välilehdessä)',
                title: 'Visit my TikTok profile',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('title', 'Visit my TikTok profile')
    })

    it('should have rel attribute with correct values', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'TikTok (avautuu uudessa välilehdessä)',
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('rel', 'me noopener noreferrer')
    })

    it('should open link in new tab', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'TikTok (avautuu uudessa välilehdessä)',
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('target', '_blank')
    })

    it('should render list item element', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'TikTok (avautuu uudessa välilehdessä)',
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })

    it('should render SVG element', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'TikTok (avautuu uudessa välilehdessä)',
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(result.querySelector('svg')).toBeDefined()
    })

    it('should render SVG with correct viewBox', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'TikTok (avautuu uudessa välilehdessä)',
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(result.querySelector('svg')).toHaveAttribute('viewBox', '-3 -2 36 36')
    })

    it('should have id attribute on link', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                ariaLabel: 'TikTok (avautuu uudessa välilehdessä)',
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('id', 'tiktok-footer-link')
    })
})
