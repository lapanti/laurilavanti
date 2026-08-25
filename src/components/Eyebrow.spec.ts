import { getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import { colors } from '../lib/styles'
import Eyebrow from './Eyebrow.astro'

describe('<Eyebrow />', () => {
    const content = 'Context'

    it('should render', async () => {
        const result = await renderAstroComponent(Eyebrow, {
            slots: {
                default: content,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should use the neutral tone by default', async () => {
        const result = await renderAstroComponent(Eyebrow, {
            slots: {
                default: content,
            },
        })
        const eyebrow = getByText(result, content)

        expect(eyebrow).toHaveClass('eyebrow')
        expect(eyebrow.getAttribute('style')).toContain(`--eyebrowColor: ${colors.eyebrowNeutral};`)
    })

    it('should inherit its tone when requested', async () => {
        const result = await renderAstroComponent(Eyebrow, {
            props: {
                tone: 'inherit',
            },
            slots: {
                default: content,
            },
        })

        expect(getByText(result, content).getAttribute('style')).toContain('--eyebrowColor: currentColor;')
    })
})
