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
                degreesTitle={degreesTitle}
                degrees={[]}
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
                degreesTitle={degreesTitle}
                degrees={degrees}
                fiduciaries={fiduciaries}
                fiduciariesTitle={fiduciariesTitle}
                jobExperiences={jobExperiences}
                jobExperiencesTitle={jobExperiencesTitle}
            />
        )

        expect(screen.getByRole('heading', { name: fiduciariesTitle })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: jobExperiencesTitle })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: degreesTitle })).toBeInTheDocument()

        fiduciaries.forEach(({ duty, organization, startYear, endYear }) =>
            expect(
                screen.getByText(`${duty}, ${organization} - ${yearsToString(startYear!, endYear)}`)
            ).toBeInTheDocument()
        )

        jobExperiences.forEach(({ title, company, location, startYear, endYear }) =>
            expect(
                screen.getByText(`${title}, ${company} (${location}) - ${yearsToString(startYear!, endYear)}`)
            ).toBeInTheDocument()
        )

        degrees.forEach(({ degree, school, location, startYear, endYear }) =>
            expect(
                screen.getByText(`${degree}, ${school} (${location}) - ${yearsToString(startYear, endYear)}`)
            ).toBeInTheDocument()
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
