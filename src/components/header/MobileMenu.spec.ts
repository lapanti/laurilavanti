import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import MobileMenu from './MobileMenu.astro'

describe('<MobileMenu />', () => {
    const links = [
        { href: '/fi/about/', label: 'Laurista', title: 'Minusta' },
        { href: '/fi/blog/', label: 'Blogi', title: 'Blogi' },
    ]

    it('should render', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                links,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the menu input', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'checkbox', { name: /Avaa valikko/i })).not.toBeChecked()
    })

    it('should render the main link', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/fi/')
    })

    it('should render the main link for sv lang', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                lang: 'sv',
                links,
            },
        })

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/sv/')
    })

    it('should render all given links', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'link', { name: 'Minusta' })).toHaveAttribute('href', '/fi/about/')
        expect(getByRole(result, 'link', { name: 'Blogi' })).toHaveAttribute('href', '/fi/blog/')
    })
})
