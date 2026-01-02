import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import H3 from './H3.astro'

describe('<H3 />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(H3, {
            slots: { default: 'Heading' },
        })

        expect(result.firstChild).toMatchSnapshot()
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
