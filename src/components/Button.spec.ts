import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Button from './Button.astro'

describe('<Button />', () => {
    const href = '/fi/ohjelma/'
    const label = 'Tutustu ohjelmaan'

    it('should render', async () => {
        const result = await renderAstroComponent(Button, {
            props: {
                href,
            },
            slots: {
                default: label,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the forest variant by default', async () => {
        const result = await renderAstroComponent(Button, {
            props: {
                href,
            },
            slots: {
                default: label,
            },
        })
        const button = getByRole(result, 'link', { name: label })

        expect(button).toHaveAttribute('href', href)
        expect(button).toHaveClass('btn')
        expect(button).not.toHaveClass('btn--green')
    })

    it('should render the green variant', async () => {
        const result = await renderAstroComponent(Button, {
            props: {
                href,
                variant: 'green',
            },
            slots: {
                default: label,
            },
        })

        expect(getByRole(result, 'link', { name: label })).toHaveClass('btn', 'btn--green')
    })
})
