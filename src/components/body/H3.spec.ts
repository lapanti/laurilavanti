import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../test/helpers'
import H3 from './H3.astro'

describe('<H3 />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(H3, {
            slots: { default: 'Heading' },
        })

        expect(result).toMatchInlineSnapshot(`
          <div>
            <h3
              data-astro-cid-3va6lj73=""
              data-astro-source-file="/home/lapanti/code/laurilavanti/src/components/body/H3.astro"
              data-astro-source-loc="28:25"
              style="--h3FontSize: 1.5rem;--h3FontWeight: 500;--h3LineHeight: 2rem;--sizes1: 1rem;"
            >
               Heading 
            </h3>
          </div>
        `)
    })

    it('should render the element', async () => {
        const result = await renderAstroComponent(H3, {
            slots: { default: 'Test Heading' },
        })

        const h3 = getByRole(result, 'heading', { level: 3 })
        expect(h3).toBeDefined()
    })

    it('should render slot content', async () => {
        const result = await renderAstroComponent(H3, {
            slots: { default: 'My Heading Text' },
        })

        const h3 = getByRole(result, 'heading', { level: 3 })
        expect(h3).toHaveTextContent('My Heading Text')
    })

    it('should support itemProp attribute', async () => {
        const result = await renderAstroComponent(H3, {
            props: { itemProp: 'headline' },
            slots: { default: 'Heading' },
        })

        const h3 = getByRole(result, 'heading', { level: 3 })
        expect(h3.getAttribute('itemprop')).toBe('headline')
    })

    it('should not have itemProp when not provided', async () => {
        const result = await renderAstroComponent(H3, {
            slots: { default: 'Heading' },
        })

        const h3 = getByRole(result, 'heading', { level: 3 })
        expect(h3.getAttribute('itemprop')).toBeNull()
    })
})
