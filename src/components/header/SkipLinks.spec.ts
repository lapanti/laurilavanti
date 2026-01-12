import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import SkipLinks from './SkipLinks.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/SkipLinks.spec.ts

describe('<SkipLinks />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(SkipLinks, {})

        expect(result).toMatchSnapshot()
    })

    it('should render main skip link', async () => {
        const result = await renderAstroComponent(SkipLinks, {})

        expect(getByRole(result, 'link', { name: /Siirry pääsisältöön/i })).toBeDefined()
    })

    it('should render footer skip link', async () => {
        const result = await renderAstroComponent(SkipLinks, {})

        expect(getByRole(result, 'link', { name: /Siirry alatunnisteeseen/i })).toBeDefined()
    })

    it('should have correct href in main link', async () => {
        const result = await renderAstroComponent(SkipLinks, {})

        expect(getByRole(result, 'link', { name: /Siirry pääsisältöön/i })).toHaveAttribute('href', '#main')
    })

    it('should have correct href in footer link', async () => {
        const result = await renderAstroComponent(SkipLinks, {})

        expect(getByRole(result, 'link', { name: /Siirry alatunnisteeseen/i })).toHaveAttribute('href', '#footer')
    })
})
