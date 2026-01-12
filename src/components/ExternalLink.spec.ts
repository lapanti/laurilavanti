import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import ExternalLink from './ExternalLink.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/ExternalLink.spec.ts

describe('<ExternalLink />', () => {
    const href = 'https://mastodontti.fi/@laurilavanti'
    const text = 'Mastodontti'

    it('should render', async () => {
        const result = await renderAstroComponent(ExternalLink, {
            props: {
                href,
            },
            slots: {
                default: text,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(ExternalLink, {
            props: {
                href,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toBeDefined()
    })

    it('should have correct href attribute', async () => {
        const result = await renderAstroComponent(ExternalLink, {
            props: {
                href,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toHaveAttribute('href', href)
    })

    it('should have correct rel attribute', async () => {
        const result = await renderAstroComponent(ExternalLink, {
            props: {
                href,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toHaveAttribute('rel', ' noopener noreferrer')
    })

    it('should have correct custom rel attribute', async () => {
        const rel = 'me'
        const result = await renderAstroComponent(ExternalLink, {
            props: {
                href,
                rel,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toHaveAttribute('rel', `${rel} noopener noreferrer`)
    })

    it('should render with aria label', async () => {
        const ariaLabel = 'A completely other text'
        const result = await renderAstroComponent(ExternalLink, {
            props: {
                ariaLabel,
                href,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: `${ariaLabel} (linkki aukeaa uudessa välilehdessä)` })).toBeDefined()
    })
})
