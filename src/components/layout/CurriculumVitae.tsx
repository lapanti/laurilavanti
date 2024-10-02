import type { Degree, Fiduciary, JobExperience } from '../../types/contentful'

import React from 'react'
import styled from 'styled-components'

import { fontFamilies, fontSizes, fontWeights, sizes } from '../../lib/styles'
import H2 from '../H2'

/** Only exported for testing purposes */
export const yearsToString = (startYear: number, endYear?: number): string => {
    if (startYear === endYear) return `${startYear}`
    return `${startYear}-${endYear ?? ''}`
}

const DivContainer = styled.div({
    ...fontSizes['2xl'],
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    marginTop: sizes[1],
    marginBottom: sizes[1],
})

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

const CurriculumVitae = styled(CurriculumVitaeComponent)({
    gridColumnStart: 3,
    marginTop: sizes[1],
})

export default CurriculumVitae
