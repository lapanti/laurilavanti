import type { Degree, Fiduciary, JobExperience } from '../../types/contentful'

import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontFamilies, fontSizes, fontWeights, sizes } from '../../lib/styles'
import H2 from '../H2'

/** Only exported for testing purposes */
export const yearsToString = (startYear: number, endYear?: number): string => {
    if (startYear === endYear) return `${startYear}`
    return `${startYear}-${endYear ?? ''}`
}

const DivContainer = styled.div({
    ...fontSizes[1.5],
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    marginBottom: sizes[1],
    marginTop: sizes[1],
})

const Li = styled.li({
    '&:before': {
        color: colors.evening,
        content: '"»"',
        left: 0,
        position: 'absolute',
    },
    marginLeft: sizes[1.25],
})

const Ul = styled.ul({
    '> li:not(:first-child)': {
        marginTop: sizes[0.5],
    },
    listStyle: 'none',
    position: 'relative',
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
            <Ul>
                {fiduciaries.map(({ duty, organization, startYear, endYear }) => (
                    <Li key={`${duty}-${organization}-${startYear}`}>
                        {duty}, {organization} - {yearsToString(startYear, endYear)}
                    </Li>
                ))}
            </Ul>
        </DivContainer>
        <br />
        <DivContainer>
            <H2>{jobExperiencesTitle}</H2>
        </DivContainer>
        <DivContainer>
            <Ul>
                {jobExperiences.map(({ title, company, location, startYear, endYear }) => (
                    <Li key={`${title}-${company}`}>
                        {title}, {company} ({location}) - {yearsToString(startYear, endYear)}
                    </Li>
                ))}
            </Ul>
        </DivContainer>
        <br />
        <DivContainer>
            <H2>{degreesTitle}</H2>
        </DivContainer>
        <DivContainer>
            <Ul>
                {degrees.map(({ degree, school, location, startYear, endYear }) => (
                    <Li key={`${degree}-${school}`}>
                        {degree}, {school} ({location}) - {yearsToString(startYear, endYear)}
                    </Li>
                ))}
            </Ul>
        </DivContainer>
    </div>
)

CurriculumVitaeComponent.displayName = 'CurriculumVitae'

const CurriculumVitae = styled(CurriculumVitaeComponent)({
    gridColumnStart: 3,
    marginTop: sizes[1],
})

export default CurriculumVitae
