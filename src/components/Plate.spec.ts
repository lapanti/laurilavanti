import { describe, expect, it } from 'vitest'

import { colors } from '../../src/lib/styles'
import { renderAstroComponent } from '../../tests/helpers'
import Plate from './Plate.astro'

describe('<Plate />', () => {
    const content = 'Plate content'
    const grounds = [
        ['sand', colors.lightSand],
        ['offWhite', colors.offWhite],
        ['gray', colors.gray],
        ['oat', colors.oat],
        ['white', colors.white],
    ] as const

    it('should render', async () => {
        const result = await renderAstroComponent(Plate, {
            slots: {
                default: content,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the plate shell', async () => {
        const result = await renderAstroComponent(Plate, {
            slots: {
                default: content,
            },
        })
        const plate = result.querySelector('section')

        expect(plate).toHaveClass('plate', 'section')
        expect(plate?.querySelector('.sheet > .inner')).not.toBeNull()
        expect(plate).toHaveTextContent(content)
    })

    it('should render id and aria-labelledby attributes', async () => {
        const id = 'contact'
        const labelledBy = 'contact-heading'
        const result = await renderAstroComponent(Plate, {
            props: {
                id,
                labelledBy,
            },
        })
        const plate = result.querySelector('section')

        expect(plate).toHaveAttribute('aria-labelledby', labelledBy)
        expect(plate).toHaveAttribute('id', id)
    })

    it.each(grounds)('should render the %s ground', async (ground, groundColor) => {
        const result = await renderAstroComponent(Plate, {
            props: {
                ground,
            },
        })
        const plate = result.querySelector('section')

        expect(plate?.getAttribute('style')).toContain(`--groundColor: ${groundColor};`)
    })
})
