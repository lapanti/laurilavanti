import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import SmartLink from './SmartLink.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/SmartLink.spec.ts

describe('<SmartLink />', () => {
    const internalHref = '/fi/blog/47/vuosi-2026-on-tekoalyn/'
    const externalHref = 'https://mastodontti.fi/@laurilavanti'
    const text = 'Vuosi 2026 on tekoälyn'

    it('should render', async () => {
        const result = await renderAstroComponent(SmartLink, {
            props: {
                href: internalHref,
            },
            slots: {
                default: text,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(SmartLink, {
            props: {
                href: internalHref,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toBeDefined()
    })

    it('should render internal link without target or noopener noreferrer', async () => {
        const result = await renderAstroComponent(SmartLink, {
            props: {
                href: internalHref,
            },
            slots: {
                default: text,
            },
        })

        const link = getByRole(result, 'link', { name: text })

        expect(link).toHaveAttribute('href', internalHref)
        expect(link).not.toHaveAttribute('target')
        expect(link).not.toHaveAttribute('rel', expect.stringContaining('noopener'))
    })

    it('should render external link with target and noopener noreferrer', async () => {
        const result = await renderAstroComponent(SmartLink, {
            props: {
                href: externalHref,
            },
            slots: {
                default: text,
            },
        })

        const link = getByRole(result, 'link', { name: text })

        expect(link).toHaveAttribute('href', externalHref)
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', ' noopener noreferrer')
    })

    it('should render external link with custom rel', async () => {
        const rel = 'me'
        const result = await renderAstroComponent(SmartLink, {
            props: {
                href: externalHref,
                rel,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toHaveAttribute('rel', `${rel} noopener noreferrer`)
    })

    it('should render external link with aria label', async () => {
        const ariaLabel = 'A completely other text'
        const result = await renderAstroComponent(SmartLink, {
            props: {
                ariaLabel,
                href: externalHref,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: `${ariaLabel} (linkki aukeaa uudessa välilehdessä)` })).toBeDefined()
    })
})
