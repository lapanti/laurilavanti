import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Titles from './Titles.astro'

describe('<Titles />', () => {
    const description = 'Description sentence shown under the headline.'
    const slogan = {
        candidacy: 'Candidacy line',
        prefix: 'Because technology should serve',
        words: ['one', 'two', 'three', 'four'] as [string, string, string, string],
    }

    it('should render', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                description,
                lang: 'en',
                slogan,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the h1 as the prefix followed by the resting word', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                description,
                lang: 'en',
                slogan,
            },
        })

        expect(getByRole(result, 'heading', { level: 1, name: `${slogan.prefix} four` })).toBeDefined()
    })

    it('should emphasise the resting word', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                description,
                lang: 'en',
                slogan,
            },
        })

        const em = result.querySelector('h1 em')

        expect(em?.textContent).toBe('four')
    })

    it('should render the candidacy line as the kicker above the headline', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                description,
                lang: 'en',
                slogan,
            },
        })

        expect(getByText(result, slogan.candidacy)).toBeDefined()
    })

    it('should render the description as the foot paragraph', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                description,
                lang: 'en',
                slogan,
            },
        })

        expect(getByText(result, description)).toBeDefined()
    })

    it('should render a call-to-action link to the driver section', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                description,
                lang: 'en',
                slogan,
            },
        })

        expect(getByRole(result, 'link')).toHaveAttribute('href', '#driver')
    })
})
