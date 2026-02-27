import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import InstagramLink from './InstagramLink.astro'

describe('<InstagramLink />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel: 'Follow us on Instagram (avautuu uudessa välilehdessä)',
                title: 'Follow us on Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel: 'Follow us on Instagram (avautuu uudessa välilehdessä)',
                title: 'Follow us on Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link')).toBeDefined()
    })

    it('should set correct href attribute', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel: 'My Instagram (avautuu uudessa välilehdessä)',
                title: 'My Instagram',
                url: 'https://instagram.com/myprofile',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('href', 'https://instagram.com/myprofile')
    })

    it('should set aria-label attribute', async () => {
        const ariaLabel = 'Follow on Instagram (avautuu uudessa välilehdessä)'
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel,
                title: 'Follow on Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('aria-label', ariaLabel)
    })

    it('should set title attribute', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel: 'Visit my Instagram profile (avautuu uudessa välilehdessä)',
                title: 'Visit my Instagram profile',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('title', 'Visit my Instagram profile')
    })

    it('should have rel attribute with correct values', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel: 'Instagram (avautuu uudessa välilehdessä)',
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('rel', 'me noopener noreferrer')
    })

    it('should open link in new tab', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel: 'Instagram (avautuu uudessa välilehdessä)',
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('target', '_blank')
    })

    it('should render list item element', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                ariaLabel: 'Instagram (avautuu uudessa välilehdessä)',
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })
})
