import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import H1 from './H1.astro'

describe('<H1 />', () => {
    const title = 'Test Title'

    it('should render', async () => {
        const result = await renderAstroComponent(H1, {
            slots: {
                default: title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render title', async () => {
        const result = await renderAstroComponent(H1, {
            slots: {
                default: title,
            },
        })

        expect(getByRole(result, 'heading', { level: 1, name: title })).toBeDefined()
    })
})
