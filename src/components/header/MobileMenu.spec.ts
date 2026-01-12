import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import MobileMenu from './MobileMenu.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/header/MobileMenu.spec.ts

describe('<MobileMenu />', () => {
    const aboutMeNavigationTitle = 'Laurista'
    const aboutMeTitle = 'Minusta'
    const aboutMeSlug = 'minusta'
    const blogNavigationTitle = 'Blogi'
    const blogSlug = 'blogi'
    const links = [
        { fields: { navigationTitle: aboutMeNavigationTitle, slug: aboutMeSlug, title: aboutMeTitle } },
        { fields: { navigationTitle: blogNavigationTitle, slug: blogSlug, title: 'Blogi' } },
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

        expect(getByRole(result, 'link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/')
    })

    it('should render all given links', async () => {
        const result = await renderAstroComponent(MobileMenu, {
            props: {
                links,
            },
        })

        expect(getByRole(result, 'link', { name: aboutMeTitle })).toHaveAttribute('href', `/${aboutMeSlug}/`)
        expect(getByRole(result, 'link', { name: blogNavigationTitle })).toHaveAttribute('href', `/${blogSlug}/`)
    })
})
