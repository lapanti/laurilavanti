import { getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Prose from './Prose.astro'

describe('<Prose />', () => {
    const content = 'Reading column content.'

    it('should render', async () => {
        const result = await renderAstroComponent(Prose, {
            slots: {
                default: `<p>${content}</p>`,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render a prose column around its slot', async () => {
        const result = await renderAstroComponent(Prose, {
            slots: {
                default: `<p>${content}</p>`,
            },
        })
        const prose = result.querySelector('div')

        expect(prose).toHaveClass('prose')
        expect(getByText(prose as HTMLElement, content).tagName).toBe('P')
    })
})
