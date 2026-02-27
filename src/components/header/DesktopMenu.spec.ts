import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import DesktopMenu from './DesktopMenu.astro'

describe('<DesktopMenu />', () => {
    const links = [
        { href: '/fi/about/', label: 'Laurista', title: 'Minusta' },
        { href: '/fi/blog/', label: 'Blogi', title: 'Blogi' },
    ]

    it('should render', async () => {
        const result = await renderAstroComponent(DesktopMenu, {
            props: {
                links,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the main link', async () => {
        const result = await renderAstroComponent(DesktopMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/')
    })

    it('should render all given links', async () => {
        const result = await renderAstroComponent(DesktopMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'link', { name: 'Minusta' })).toHaveAttribute('href', '/fi/about/')
        expect(getByRole(result, 'link', { name: 'Blogi' })).toHaveAttribute('href', '/fi/blog/')
    })
})
