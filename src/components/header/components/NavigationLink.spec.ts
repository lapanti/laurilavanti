import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import NavigationLink from './NavigationLink.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/header/components/NavigationLink.spec.ts

describe('<NavigationLink />', () => {
    const slug = 'minusta'
    const title = 'Minusta'
    const navigationTitle = 'Laurista'

    it('should render', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                navigationTitle,
                slug,
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                navigationTitle,
                slug,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: navigationTitle })).toBeDefined()
    })

    it('should have correct href attribute', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                navigationTitle,
                slug,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: navigationTitle })).toHaveAttribute('href', `/${slug}/`)
    })

    it('should set title attribute', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                navigationTitle,
                slug,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: navigationTitle })).toHaveAttribute('title', title)
    })

    it('should have aria-current as false when not in correct page', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                navigationTitle,
                slug,
                title,
            },
            request: new Request('https://laurilavanti.fi/'),
        })

        expect(getByRole(result, 'link', { name: navigationTitle })).toHaveAttribute('aria-current', 'false')
    })

    it('should have aria-current as page when in correct page', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                navigationTitle,
                slug,
                title,
            },
            request: new Request(`https://laurilavanti.fi/${slug}/`),
        })

        expect(getByRole(result, 'link', { name: navigationTitle })).toHaveAttribute('aria-current', 'page')
    })
})
