import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import TikTokLink from './TikTokLink.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/footer/TikTokLink.spec.ts

describe('<TikTokLink />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'Follow us on TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'Follow us on TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link', { name: /Follow us on TikTok/i })).toBeDefined()
    })

    it('should set correct href attribute', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'My TikTok',
                url: 'https://tiktok.com/@myprofile',
            },
        })

        expect(getByRole(result, 'link', { name: /My TikTok/i })).toHaveAttribute(
            'href',
            'https://tiktok.com/@myprofile'
        )
    })

    it('should set aria-label with title', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'Follow on TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link', { name: /Follow on TikTok/i })).toHaveAttribute(
            'aria-label',
            'Follow on TikTok'
        )
    })

    it('should set title attribute', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'Visit my TikTok profile',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link', { name: /Visit my TikTok profile/i })).toHaveAttribute(
            'title',
            'Visit my TikTok profile'
        )
    })

    it('should have rel attribute with correct values', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link', { name: /TikTok/i })).toHaveAttribute('rel', 'me noopener noreferrer')
    })

    it('should open link in new tab', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link', { name: /TikTok/i })).toHaveAttribute('target', '_blank')
    })

    it('should render list item element', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })

    it('should render SVG element', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(result.querySelector('svg')).toBeDefined()
    })

    it('should render SVG with correct viewBox', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(result.querySelector('svg')).toHaveAttribute('viewBox', '-3 -2 36 36')
    })

    it('should have id attribute on link', async () => {
        const result = await renderAstroComponent(TikTokLink, {
            props: {
                title: 'TikTok',
                url: 'https://tiktok.com/@example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('id', 'tiktok-footer-link')
    })
})
