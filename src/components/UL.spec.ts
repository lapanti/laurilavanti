import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import UL from './UL.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/UL.spec.ts

describe('<UL />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(UL, {
            props: {},
            slots: {},
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a list element', async () => {
        const result = await renderAstroComponent(UL, {
            props: {},
            slots: {},
        })

        expect(getByRole(result, 'list')).toBeDefined()
    })
})
