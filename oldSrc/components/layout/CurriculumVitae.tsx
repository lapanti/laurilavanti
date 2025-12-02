import type { Degree, Fiduciary, JobExperience } from '../../types/contentful'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { fontWeights, sizes, typographics } from '../../lib/styles'
import H2 from '../H2'
import LI from '../LI'
import UL from '../UL'

/** Only exported for testing purposes */
export const yearsToString = (startYear: number, endYear?: number): string => {
    if (startYear === endYear) return `${startYear}`
    return `${startYear}–${endYear ?? ''}`
}

const DivContainer = styled.div({
    ...typographics.body,
    marginBottom: sizes[1],
    marginTop: sizes[1],
})

const ListItem = styled(LI)<{ $isCurrent: boolean }>(({ $isCurrent }) =>
    $isCurrent ? { fontWeight: fontWeights.black } : {}
)

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
            <UL>
                {fiduciaries.map(({ duty, organization, startYear, endYear }) => (
                    <ListItem key={`${duty}-${organization}-${startYear}`} $isCurrent={!endYear}>
                        <span>{duty} </span>
                        <i>
                            {organization} {yearsToString(startYear, endYear)}
                        </i>
                    </ListItem>
                ))}
            </UL>
        </DivContainer>
        <br />
        <DivContainer>
            <H2>{jobExperiencesTitle}</H2>
        </DivContainer>
        <DivContainer>
            <UL>
                {jobExperiences.map(({ title, company, location, startYear, endYear }) => (
                    <ListItem key={`${title}-${company}`} $isCurrent={!endYear}>
                        <span>{title} </span>
                        <i>
                            {company} ({location}) {yearsToString(startYear, endYear)}
                        </i>
                    </ListItem>
                ))}
            </UL>
        </DivContainer>
        <br />
        <DivContainer>
            <H2>{degreesTitle}</H2>
        </DivContainer>
        <DivContainer>
            <UL>
                {degrees.map(({ degree, school, location, startYear, endYear }) => (
                    <ListItem key={`${degree}-${school}`} $isCurrent={!endYear}>
                        <span>{degree} </span>
                        <i>
                            {school} ({location}) {yearsToString(startYear, endYear)}
                        </i>
                    </ListItem>
                ))}
            </UL>
        </DivContainer>
    </div>
)

CurriculumVitaeComponent.displayName = 'CurriculumVitae'

const CurriculumVitae = styled(CurriculumVitaeComponent)({
    gridColumnStart: 3,
    marginTop: sizes[1],
})

export default CurriculumVitae
