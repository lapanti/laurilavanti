import type { Degree, Fiduciary, JobExperience } from '../../types/contentful'

import React from 'react'
import tw from 'twin.macro'

import H2 from '../H2'
import Paragraph from '../Paragraph'

const yearsToString = (startYear: number, endYear?: number): string => {
    if (startYear === endYear) return `${startYear}`
    return `${startYear}-${endYear ? endYear : ''}`
}

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
}: Props): JSX.Element => {
    console.log(fiduciaries)

    return (
        <div className={className}>
            <Paragraph>
                <H2>{fiduciariesTitle}</H2>
            </Paragraph>
            <Paragraph>
                <ul>
                    {fiduciaries.map(({ duty, organization, startYear, endYear }) => (
                        <li key={`${duty}-${organization}-${startYear}`}>
                            {duty}, {organization} - {yearsToString(startYear, endYear)}
                        </li>
                    ))}
                </ul>
            </Paragraph>
            <Paragraph>
                <H2>{jobExperiencesTitle}</H2>
            </Paragraph>
            <Paragraph>
                <ul>
                    {jobExperiences.map(({ title, company, location, startYear, endYear }) => (
                        <li key={`${title}-${company}`}>
                            {title}, {company} ({location}) - {yearsToString(startYear, endYear)}
                        </li>
                    ))}
                </ul>
            </Paragraph>
            <Paragraph>
                <H2>{degreesTitle}</H2>
            </Paragraph>
            <Paragraph>
                <ul>
                    {degrees.map(({ degree, school, location, startYear, endYear }) => (
                        <li key={`${degree}-${school}`}>
                            {degree}, {school} ({location}) - {yearsToString(startYear, endYear)}
                        </li>
                    ))}
                </ul>
            </Paragraph>
        </div>
    )
}

CurriculumVitaeComponent.displayName = 'CurriculumVitae'

const CurriculumVitae = tw(CurriculumVitaeComponent)`
    col-start-3 mt-4
`

export default CurriculumVitae
