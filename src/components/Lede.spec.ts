import { getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Lede from './Lede.astro'

describe('<Lede />', () => {
    const content = 'Signal Band lead text.'

    it('should render', async () => {
        const result = await renderAstroComponent(Lede, {
            slots: {
                default: content,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a lead paragraph', async () => {
        const result = await renderAstroComponent(Lede, {
            slots: {
                default: content,
            },
        })
        const lede = getByText(result, content)

        expect(lede).toHaveClass('lede')
        expect(lede.tagName).toBe('P')
    })

    it('should render the wide variant', async () => {
        const result = await renderAstroComponent(Lede, {
            props: {
                wide: true,
            },
            slots: {
                default: content,
            },
        })

        expect(getByText(result, content)).toHaveClass('lede', 'lede--wide')
    })
})
