import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../test/helpers'
import Hr from './Hr.astro'

describe('<Hr />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Hr)

        expect(result).toMatchInlineSnapshot(
            `
          <div>
            <hr
              data-astro-cid-ynkeys4z=""
              data-astro-source-file="/home/lapanti/code/laurilavanti/src/components/body/Hr.astro"
              data-astro-source-loc="11:2"
              style="--sizes1: 1rem;"
            />
          </div>
        `
        )
    })

    it('should render the element', async () => {
        const result = await renderAstroComponent(Hr)

        const hr = getByRole(result, 'separator')
        expect(hr).toBeDefined()
    })
})
