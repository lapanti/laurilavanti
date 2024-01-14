import type { Degree, Fiduciary, JobExperience } from '../../types/contentful'

import React from 'react'
import tw from 'twin.macro'

import H2 from '../H2'

/** Only exported for testing purposes */
export const yearsToString = (startYear: number, endYear?: number): string => {
    if (startYear === endYear) return `${startYear}`
    return `${startYear}-${endYear ? endYear : ''}`
}

const DivContainer = tw.div`
    text-lg font-sans font-normal my-4
`

interface Props {
    className?: string
    degreesTitle: string
    degrees: Degree[]
    fiduciariesTitle: string
    fiduciaries: Fiduciary[]
    jobExperiencesTitle: string
    jobExperiences: JobExperience[]
}

const CurriculumVitaeComponent = ({
    className,
    degreesTitle,
    degrees,
    fiduciariesTitle,
    fiduciaries,
    jobExperiencesTitle,
    jobExperiences,
}: Props): JSX.Element => (
    <div className={className}>
        <DivContainer>
            <H2>{fiduciariesTitle}</H2>
        </DivContainer>
        <DivContainer>
            <ul>
                {fiduciaries.map(({ duty, organization, startYear, endYear }) => (
                    <li key={`${duty}-${organization}-${startYear}`}>
                        {duty}, {organization} - {yearsToString(startYear, endYear)}
                    </li>
                ))}
            </ul>
        </DivContainer>
        <DivContainer>
            <H2>{jobExperiencesTitle}</H2>
        </DivContainer>
        <DivContainer>
            <ul>
                {jobExperiences.map(({ title, company, location, startYear, endYear }) => (
                    <li key={`${title}-${company}`}>
                        {title}, {company} ({location}) - {yearsToString(startYear, endYear)}
                    </li>
                ))}
            </ul>
        </DivContainer>
        <DivContainer>
            <H2>{degreesTitle}</H2>
        </DivContainer>
        <DivContainer>
            <ul>
                {degrees.map(({ degree, school, location, startYear, endYear }) => (
                    <li key={`${degree}-${school}`}>
                        {degree}, {school} ({location}) - {yearsToString(startYear, endYear)}
                    </li>
                ))}
            </ul>
        </DivContainer>
    </div>
)

CurriculumVitaeComponent.displayName = 'CurriculumVitae'

const CurriculumVitae = tw(CurriculumVitaeComponent)`
    col-start-3 mt-4
`

export default CurriculumVitae
