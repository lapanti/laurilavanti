import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import LinkRule from './LinkRule.astro'

describe('<LinkRule />', () => {
    const href = '/fi/kirjoitukset/'
    const label = 'Kaikki kirjoitukset'

    it('should render', async () => {
        const result = await renderAstroComponent(LinkRule, {
            props: {
                href,
            },
            slots: {
                default: label,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a link rule with its href', async () => {
        const result = await renderAstroComponent(LinkRule, {
            props: {
                href,
            },
            slots: {
                default: label,
            },
        })
        const link = getByRole(result, 'link', { name: label })

        expect(link).toHaveAttribute('href', href)
        expect(link).toHaveClass('link-rule')
    })
})
