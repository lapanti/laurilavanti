import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import NavigationLink from './NavigationLink.astro'

describe('<NavigationLink />', () => {
    const href = '/fi/about/'
    const label = 'Laurista'
    const title = 'Laurista'

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

    it('should not set aria-label when label equals title', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label,
                title,
            },
        })

        expect(getByRole(result, 'link', { name: title })).not.toHaveAttribute('aria-label')
    })

    it('should set combined aria-label when label differs from title', async () => {
        const result = await renderAstroComponent(NavigationLink, {
            props: {
                href,
                label: 'EN',
                title: 'In English',
            },
        })

        expect(getByRole(result, 'link', { name: 'EN – In English' })).toHaveAttribute('aria-label', 'EN – In English')
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
