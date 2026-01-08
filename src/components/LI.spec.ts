import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import LI from './LI.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/LI.spec.ts

describe('<LI />', () => {
    const name = 'List item'

    it('should render', async () => {
        const result = await renderAstroComponent(LI, {
            props: {},
            slots: {
                default: name,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render heavy', async () => {
        const result = await renderAstroComponent(LI, {
            props: {
                heavy: true,
            },
            slots: {
                default: name,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a list item element', async () => {
        const result = await renderAstroComponent(LI, {
            props: {},
            slots: {
                default: name,
            },
        })

        expect(getByRole(result, 'listitem')).toHaveTextContent(name)
    })
})
