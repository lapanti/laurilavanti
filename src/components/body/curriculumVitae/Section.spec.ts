import { getAllByRole, getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import Section from './Section.astro'

describe('<Section />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Section, {
            props: {
                items: [],
                title: 'Experience',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the heading', async () => {
        const result = await renderAstroComponent(Section, {
            props: {
                items: [],
                title: 'Education',
            },
        })

        const heading = getByRole(result, 'heading', { level: 2 })
        expect(heading).toBeDefined()
        expect(heading).toHaveTextContent('Education')
    })

    it('should render unordered list', async () => {
        const result = await renderAstroComponent(Section, {
            props: {
                items: [],
                title: 'Fiduciaries',
            },
        })

        expect(getByRole(result, 'list')).toBeDefined()
    })

    it('should render items when provided', async () => {
        const result = await renderAstroComponent(Section, {
            props: {
                items: [
                    {
                        fields: {
                            company: 'Tech Corp',
                            endYear: 2023,
                            startYear: 2020,
                            title: 'Engineer',
                        },
                    },
                ],
                title: 'Work Experience',
            },
        })

        expect(getByRole(result, 'listitem')).toBeDefined()
    })

    it('should render multiple items', async () => {
        const result = await renderAstroComponent(Section, {
            props: {
                items: [
                    {
                        fields: {
                            degree: 'Bachelor',
                            endYear: 2019,
                            school: 'University A',
                            startYear: 2015,
                        },
                    },
                    {
                        fields: {
                            degree: 'Master',
                            endYear: 2022,
                            school: 'University B',
                            startYear: 2020,
                        },
                    },
                ],
                title: 'Degrees',
            },
        })

        expect(getAllByRole(result, 'listitem')).toHaveLength(2)
    })

    it('should filter out undefined items', async () => {
        const result = await renderAstroComponent(Section, {
            props: {
                items: [
                    {
                        fields: {
                            company: 'Company A',
                            startYear: 2020,
                        },
                    },
                    undefined,
                    {
                        fields: {
                            company: 'Company B',
                            startYear: 2021,
                        },
                    },
                ],
                title: 'Experience',
            },
        })

        expect(getAllByRole(result, 'listitem')).toHaveLength(2)
    })

    it('should handle null items gracefully', async () => {
        const result = await renderAstroComponent(Section, {
            props: {
                items: null,
                title: 'Experience',
            },
        })

        expect(getByRole(result, 'heading', { level: 2 })).toBeDefined()
    })
})
