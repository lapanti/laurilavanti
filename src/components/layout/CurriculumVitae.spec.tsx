import { render, screen } from '@testing-library/react'
import React from 'react'

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
            expect(screen.getByText(`${organization} — ${yearsToString(startYear, endYear)}`)).toBeInTheDocument()
        })

        jobExperiences.forEach(({ title, company, location, startYear, endYear }) => {
            expect(screen.getAllByText(title).length).toBeGreaterThan(0)
            expect(
                screen.getByText(`${company} (${location}) — ${yearsToString(startYear, endYear)}`)
            ).toBeInTheDocument()
        })

        degrees.forEach(({ degree, school, location, startYear, endYear }) => {
            expect(screen.getByText(degree)).toBeInTheDocument()
            expect(
                screen.getByText(`${school} (${location}) — ${yearsToString(startYear, endYear)}`)
            ).toBeInTheDocument()
        })

        expect(container.firstChild).toMatchSnapshot()
    })
})
