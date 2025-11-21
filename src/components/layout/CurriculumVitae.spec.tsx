import { render, screen } from '@testing-library/react'

import {
    degrees,
    degreesTitle,
    fiduciaries,
    fiduciariesTitle,
    jobExperiences,
    jobExperiencesTitle,
} from '../../../tests/curriculumVitae.mock'
import CurriculumVitae, { yearsToString } from './CurriculumVitae'

describe('<CurriculumVitae />', () => {
    describe('yearsToString', () => {
        const twentyTwentyFive = 2025
        const twentyThirty = 2030

        it('should return only the year if they are the same', () => {
            expect(yearsToString(twentyTwentyFive, twentyTwentyFive)).toBe(`${twentyTwentyFive}`)
        })

        it('should return start year with dash if no end year', () => {
            expect(yearsToString(twentyTwentyFive)).toBe(`${twentyTwentyFive}–`)
        })

        it('should return start to end with dash when they are both present and different', () => {
            expect(yearsToString(twentyTwentyFive, twentyThirty)).toBe(`${twentyTwentyFive}–${twentyThirty}`)
        })
    })

    it('should render empty', () => {
        const { container } = render(
            <CurriculumVitae
                degrees={[]}
                degreesTitle={degreesTitle}
                fiduciaries={[]}
                fiduciariesTitle={fiduciariesTitle}
                jobExperiences={[]}
                jobExperiencesTitle={jobExperiencesTitle}
            />
        )

        expect(screen.getByRole('heading', { name: fiduciariesTitle })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: jobExperiencesTitle })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: degreesTitle })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render full', () => {
        const { container } = render(
            <CurriculumVitae
                degrees={degrees}
                degreesTitle={degreesTitle}
                fiduciaries={fiduciaries}
                fiduciariesTitle={fiduciariesTitle}
                jobExperiences={jobExperiences}
                jobExperiencesTitle={jobExperiencesTitle}
            />
        )

        expect(screen.getByRole('heading', { name: fiduciariesTitle })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: jobExperiencesTitle })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: degreesTitle })).toBeInTheDocument()

        fiduciaries.forEach(({ duty, organization, startYear, endYear }) => {
            expect(screen.getByText(duty)).toBeInTheDocument()
            expect(screen.getByText(`${organization} ${yearsToString(startYear, endYear)}`)).toBeInTheDocument()
        })

        jobExperiences.forEach(({ title, company, location, startYear, endYear }) => {
            expect(screen.getAllByText(title).length).toBeGreaterThan(0)
            expect(
                screen.getByText(`${company} (${location}) ${yearsToString(startYear, endYear)}`)
            ).toBeInTheDocument()
        })

        degrees.forEach(({ degree, school, location, startYear, endYear }) => {
            expect(screen.getByText(degree)).toBeInTheDocument()
            expect(screen.getByText(`${school} (${location}) ${yearsToString(startYear, endYear)}`)).toBeInTheDocument()
        })

        expect(container.firstChild).toMatchSnapshot()
    })
})
