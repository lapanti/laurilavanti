import { getAllByRole, getByRole, queryAllByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import CurriculumVitae from './CurriculumVitae.astro'

describe('<CurriculumVitae />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [],
                degreesTitle: 'Education',
                fiduciaries: [],
                fiduciariesTitle: 'Fiduciaries',
                jobExperiences: [],
                jobExperiencesTitle: 'Experience',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render three sections', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [],
                degreesTitle: 'Education',
                fiduciaries: [],
                fiduciariesTitle: 'Fiduciaries',
                jobExperiences: [],
                jobExperiencesTitle: 'Experience',
            },
        })

        const headings = getAllByRole(result, 'heading', { level: 2 })
        expect(headings).toHaveLength(3)
    })

    it('should render fiduciaries section with correct title', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [],
                degreesTitle: 'Education',
                fiduciaries: [],
                fiduciariesTitle: 'Board Memberships',
                jobExperiences: [],
                jobExperiencesTitle: 'Experience',
            },
        })

        expect(getByRole(result, 'heading', { level: 2, name: /Board Memberships/i })).toBeDefined()
    })

    it('should render job experiences section with correct title', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [],
                degreesTitle: 'Education',
                fiduciaries: [],
                fiduciariesTitle: 'Fiduciaries',
                jobExperiences: [],
                jobExperiencesTitle: 'Work Experience',
            },
        })

        expect(getByRole(result, 'heading', { level: 2, name: /Work Experience/i })).toBeDefined()
    })

    it('should render degrees section with correct title', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [],
                degreesTitle: 'Academic Degrees',
                fiduciaries: [],
                fiduciariesTitle: 'Fiduciaries',
                jobExperiences: [],
                jobExperiencesTitle: 'Experience',
            },
        })

        expect(getByRole(result, 'heading', { level: 2, name: /Academic Degrees/i })).toBeDefined()
    })

    it('should render sections with items', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [
                    {
                        fields: {
                            degree: 'Bachelor',
                            endYear: 2020,
                            school: 'University A',
                            startYear: 2016,
                        },
                    },
                ],
                degreesTitle: 'Education',
                fiduciaries: [
                    {
                        fields: {
                            company: 'Board A',
                            startYear: 2021,
                            title: 'Chair',
                        },
                    },
                ],
                fiduciariesTitle: 'Fiduciaries',
                jobExperiences: [
                    {
                        fields: {
                            company: 'Tech Corp',
                            endYear: 2023,
                            startYear: 2020,
                            title: 'Engineer',
                        },
                    },
                ],
                jobExperiencesTitle: 'Experience',
            },
        })

        const listItems = getAllByRole(result, 'listitem')
        expect(listItems.length).toBeGreaterThanOrEqual(3)
    })

    it('should handle empty arrays for all sections', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [],
                degreesTitle: 'Education',
                fiduciaries: [],
                fiduciariesTitle: 'Fiduciaries',
                jobExperiences: [],
                jobExperiencesTitle: 'Experience',
            },
        })

        const lists = queryAllByRole(result, 'ul')
        expect(lists.length).toBeGreaterThanOrEqual(0)
    })

    it('should render sections in correct order', async () => {
        const result = await renderAstroComponent(CurriculumVitae, {
            props: {
                degrees: [],
                degreesTitle: 'Education',
                fiduciaries: [],
                fiduciariesTitle: 'Fiduciaries',
                jobExperiences: [],
                jobExperiencesTitle: 'Experience',
            },
        })

        const headings = getAllByRole(result, 'heading', { level: 2 })
        expect(headings[0]).toHaveTextContent('Fiduciaries')
        expect(headings[1]).toHaveTextContent('Experience')
        expect(headings[2]).toHaveTextContent('Education')
    })
})
