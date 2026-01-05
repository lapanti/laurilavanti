import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Titles from './Titles.astro'

describe('<Titles />', () => {
    const secondaryTitle = 'Secondary Title'
    const subtitle = 'Subtitle'
    const title = 'Test Title'

    it('should render', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                secondaryTitle,
                subtitle,
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render title', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                title,
            },
        })

        expect(getByRole(result, 'heading', { level: 1, name: title })).toBeDefined()
    })

    it('should render subtitle', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                subtitle,
                title,
            },
        })

        expect(getByText(result, subtitle)).toBeDefined()
    })

    it('should render secondary title', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                secondaryTitle,
                title,
            },
        })

        expect(getByRole(result, 'heading', { level: 2, name: secondaryTitle })).toBeDefined()
    })
})
