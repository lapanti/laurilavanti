import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import H2 from './H2.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/H2.spec.ts

describe('<H2 />', () => {
    const itemProp = 'headline'
    const name = 'Mastodontti'

    it('should render', async () => {
        const result = await renderAstroComponent(H2, {
            props: {},
            slots: {
                default: name,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a header element', async () => {
        const result = await renderAstroComponent(H2, {
            props: {},
            slots: {
                default: name,
            },
        })

        expect(getByRole(result, 'heading', { level: 2, name: name })).toBeDefined()
    })

    it('should have correct itemProp attribute', async () => {
        const result = await renderAstroComponent(H2, {
            props: {
                itemProp,
            },
            slots: {
                default: name,
            },
        })

        expect(getByRole(result, 'heading', { level: 2, name: name })).toHaveAttribute('itemProp', itemProp)
    })
})
