import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Hr from './Hr.astro'

describe('<Hr />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Hr)

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the element', async () => {
        const result = await renderAstroComponent(Hr)

        const hr = getByRole(result, 'separator')
        expect(hr).toBeDefined()
    })
})
