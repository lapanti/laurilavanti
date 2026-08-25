import { getAllByRole, getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Chips from './Chips.astro'

describe('<Chips />', () => {
    const items = [
        { href: '/fi/rss.xml', label: 'RSS-syöte' },
        { href: 'https://bsky.app/profile/lauri.lavanti.fi', label: 'Bluesky' },
    ]

    it('should render', async () => {
        const result = await renderAstroComponent(Chips, {
            props: {
                items,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render every item as a list link', async () => {
        const result = await renderAstroComponent(Chips, {
            props: {
                items,
            },
        })
        const list = getByRole(result, 'list')

        expect(getAllByRole(list, 'listitem')).toHaveLength(items.length)
        expect(getAllByRole(list, 'link')).toHaveLength(items.length)
    })

    it('should render an accessible list label', async () => {
        const ariaLabel = 'Sosiaalinen media'
        const result = await renderAstroComponent(Chips, {
            props: {
                ariaLabel,
                items,
            },
        })

        expect(getByRole(result, 'list', { name: ariaLabel })).toBeDefined()
    })

    it('should add noopener only to external links', async () => {
        const result = await renderAstroComponent(Chips, {
            props: {
                items,
            },
        })
        const externalLink = getByRole(result, 'link', { name: 'Bluesky' })
        const internalLink = getByRole(result, 'link', { name: 'RSS-syöte' })

        expect(externalLink).toHaveAttribute('rel', 'noopener')
        expect(externalLink).not.toHaveAttribute('target')
        expect(internalLink).not.toHaveAttribute('rel')
    })
})
