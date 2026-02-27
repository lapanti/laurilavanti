import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import NavigationLink from './NavigationLink.astro'

describe('<NavigationLink />', () => {
    const href = '/fi/about/'
    const label = 'Laurista'
    const title = 'Minusta'

    it('should render', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label,
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link element', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: title })).toBeDefined()
    })

    it('should have correct href attribute', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: title })).toHaveAttribute('href', href)
    })

    it('should set aria-label attribute', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: title })).toHaveAttribute('aria-label', title)
    })

    it('should have aria-current as false when not in correct page', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label,
                title,
            },
            request: new Request('https://laurilavanti.fi/'),
        })

        expect(getByRole(result, 'link', { name: title })).toHaveAttribute('aria-current', 'false')
    })

    it('should have aria-current as page when in correct page', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label,
                title,
            },
            request: new Request(`https://laurilavanti.fi${href}`),
        })

        expect(getByRole(result, 'link', { name: title })).toHaveAttribute('aria-current', 'page')
    })
})
