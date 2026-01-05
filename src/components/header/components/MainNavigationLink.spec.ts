import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import MainNavigationLink from './MainNavigationLink.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/header/components/MainNavigationLink.spec.ts

describe('<MainNavigationLink />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(MainNavigationLink, {})

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(MainNavigationLink, {})

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toBeDefined()
    })

    it('should have correct href attribute', async () => {
        const result = await renderAstroComponent(MainNavigationLink, {})

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/')
    })

    it('should set title attribute', async () => {
        const result = await renderAstroComponent(MainNavigationLink, {})

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('title', 'Lauri Lavanti')
    })

    it('should have aria-current as false when not in home page', async () => {
        const result = await renderAstroComponent(MainNavigationLink, {
            request: new Request('https://laurilavanti.fi/minusta'),
        })

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('aria-current', 'false')
    })

    it('should have aria-current as page when in home page', async () => {
        const result = await renderAstroComponent(MainNavigationLink, {
            request: new Request('https://laurilavanti.fi/'),
        })

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('aria-current', 'page')
    })
})
