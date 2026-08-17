import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Titles from './Titles.astro'

describe('<Titles />', () => {
    const secondaryTitle = 'Secondary Title'
    const title = 'Test Title'
    const slogan = {
        candidacy: 'Candidacy line',
        prefix: 'Because technology should serve',
        words: ['one', 'two', 'three', 'four'] as [string, string, string, string],
    }

    it('should render', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                secondaryTitle,
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the name logo as h1', async () => {
        const result = await renderAstroComponent(Titles, {
            props: {
                title,
            },
        })

        expect(getByRole(result, 'heading', { level: 1, name: 'Lauri Lavanti' })).toBeDefined()
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

    describe('with a slogan', () => {
        it('should render', async () => {
            const result = await renderAstroComponent(Titles, {
                props: {
                    slogan,
                    title,
                },
            })

            expect(result.firstChild).toMatchSnapshot()
        })

        it('should name the h2 after the resting slogan, not the animation', async () => {
            const result = await renderAstroComponent(Titles, {
                props: {
                    slogan,
                    title,
                },
            })

            expect(getByRole(result, 'heading', { level: 2, name: `${slogan.prefix} four` })).toBeDefined()
        })

        it('should render the resting word so the slogan is complete without JavaScript', async () => {
            const result = await renderAstroComponent(Titles, {
                props: {
                    slogan,
                    title,
                },
            })
            const typed = result.querySelector('.typed')

            expect(typed?.textContent?.trim()).toBe('four')
            expect(typed?.getAttribute('data-typed-words')).toBe(JSON.stringify(slogan.words))
        })

        it('should render the candidacy line after the slogan', async () => {
            const result = await renderAstroComponent(Titles, {
                props: {
                    slogan,
                    title,
                },
            })
            const heading = getByRole(result, 'heading', { level: 2 })
            const candidacy = getByText(result, slogan.candidacy)

            expect(heading.nextElementSibling).toBe(candidacy)
        })

        it('should take precedence over secondaryTitle', async () => {
            const result = await renderAstroComponent(Titles, {
                props: {
                    secondaryTitle,
                    slogan,
                    title,
                },
            })

            expect(result.textContent).not.toContain(secondaryTitle)
        })
    })
})
