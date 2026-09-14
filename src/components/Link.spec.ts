import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Link from './Link.astro'

describe('<Link />', () => {
    const href = '/blogi/vuosi-2026-on-tekoalyn'
    const text = 'Vuosi 2026 on tekoälyn'

    it('should render', async () => {
        const result = await renderAstroComponent(Link, {
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
        const result = await renderAstroComponent(Link, {
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
        const result = await renderAstroComponent(Link, {
            props: {
                href,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toHaveAttribute('href', href)
    })

    it('should have correct custom rel attribute', async () => {
        const rel = 'me'
        const result = await renderAstroComponent(Link, {
            props: {
                href,
                rel,
            },
            slots: {
                default: text,
            },
        })

        expect(getByRole(result, 'link', { name: text })).toHaveAttribute('rel', `${rel}`)
    })
})
