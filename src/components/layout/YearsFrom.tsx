import { differenceInYears, parse } from 'date-fns'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

interface Props {
    className?: string
    dateToCountFrom?: string // In the format of 'yyyy-MM-dd'
}

const YearsFromComponent = ({ className, dateToCountFrom }: Props): JSX.Element | null =>
    dateToCountFrom ? (
        <span className={className}>
            {differenceInYears(new Date(), parse(dateToCountFrom, 'yyyy-MM-dd', new Date()))}
        </span>
    ) : null

YearsFromComponent.displayName = 'YearsFrom'

const YearsFrom = styled(YearsFromComponent)({})

export default YearsFrom
