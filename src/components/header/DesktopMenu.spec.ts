import { getAllByRole, getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import DesktopMenu from './DesktopMenu.astro'

describe('<DesktopMenu />', () => {
    const links = [
        { href: '/fi/about/', label: 'Laurista', title: 'Laurista' },
        { href: '/fi/blog/', label: 'Blogi', title: 'Blogi' },
    ]

    it('should render the main link', async () => {
        const result = await renderAstroComponent(DesktopMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/fi/')
    })

    it('should render the main link for sv lang', async () => {
        const result = await renderAstroComponent(DesktopMenu, {
            props: {
                lang: 'sv',
                links,
            },
        })

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/sv/')
    })

    it('should render all given links', async () => {
        const result = await renderAstroComponent(DesktopMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'link', { name: 'Laurista' })).toHaveAttribute('href', '/fi/about/')
        expect(getByRole(result, 'link', { name: 'Blogi' })).toHaveAttribute('href', '/fi/blog/')
    })

    it('should render links inside a localized navigation landmark and lists', async () => {
        const result = await renderAstroComponent(DesktopMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'navigation', { name: 'Päänavigaatio' })).toHaveAttribute(
            'aria-label',
            'Päänavigaatio'
        )
        expect(getAllByRole(result, 'list')).toHaveLength(2)
        expect(getAllByRole(result, 'listitem')).toHaveLength(links.length + 1)
    })
})
