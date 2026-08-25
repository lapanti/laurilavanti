import { getAllByRole, getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import MobileMenu from './MobileMenu.astro'

describe('<MobileMenu />', () => {
    const links = [
        { href: '/fi/about/', label: 'Laurista', title: 'Laurista' },
        { href: '/fi/blog/', label: 'Blogi', title: 'Blogi' },
    ]

    it('should render a closed menu disclosure', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                links,
            },
        })

        const button = getByRole(result, 'button', { name: 'Avaa valikko' })
        const menu = result.querySelector('#mobile-primary-navigation')

        expect(button).toHaveAttribute('aria-controls', 'mobile-primary-navigation')
        expect(button).toHaveAttribute('aria-expanded', 'false')
        expect(menu).toHaveAttribute('aria-label', 'Päänavigaatio')
        expect(menu).toHaveAttribute('hidden')
        expect(getAllByRole(menu as HTMLElement, 'listitem', { hidden: true })).toHaveLength(links.length)
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
        expect(getByRole(result, 'button', { name: 'Öppna menyn' })).toHaveAttribute(
            'aria-controls',
            'mobile-primary-navigation'
        )
    })

    it('should render all given links', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                links,
            },
        })

        const menu = result.querySelector('#mobile-primary-navigation')

        expect(menu?.querySelector('a[href="/fi/about/"]')).toHaveTextContent('Laurista')
        expect(menu?.querySelector('a[href="/fi/blog/"]')).toHaveTextContent('Blogi')
    })
})
