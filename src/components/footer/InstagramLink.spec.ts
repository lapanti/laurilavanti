import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import InstagramLink from './InstagramLink.astro'

describe('<InstagramLink />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'Follow us on Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'Follow us on Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link', { name: /Follow us on Instagram/i })).toBeDefined()
    })

    it('should set correct href attribute', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'My Instagram',
                url: 'https://instagram.com/myprofile',
            },
        })

        expect(getByRole(result, 'link', { name: /My Instagram/i })).toHaveAttribute(
            'href',
            'https://instagram.com/myprofile'
        )
    })

    it('should set aria-label with title', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'Follow on Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link', { name: /Follow on Instagram/i })).toHaveAttribute(
            'aria-label',
            'Follow on Instagram'
        )
    })

    it('should set title attribute', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'Visit my Instagram profile',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link', { name: /Visit my Instagram profile/i })).toHaveAttribute(
            'title',
            'Visit my Instagram profile'
        )
    })

    it('should have rel attribute with correct values', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link', { name: /Instagram/i })).toHaveAttribute('rel', 'me noopener noreferrer')
    })

    it('should open link in new tab', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'link', { name: /Instagram/i })).toHaveAttribute('target', '_blank')
    })

    it('should render list item element', async () => {
        const result = await renderAstroComponent(InstagramLink, {
            props: {
                title: 'Instagram',
                url: 'https://instagram.com/example',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })
})
