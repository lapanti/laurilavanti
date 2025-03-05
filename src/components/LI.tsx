import type { ReactNode } from 'react'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontFamilies, fontSizes, fontWeights, sizes } from '../lib/styles'
import Paragraph from './Paragraph'

interface Props {
    className?: string
    children: ReactNode
}

const LIComponent = ({ className, children }: Props): JSX.Element => <li className={className}>{children}</li>

LIComponent.displayName = 'LI'

const LI = styled(LIComponent)({
    [`> ${Paragraph}`]: {
        margin: 0,
    },
    '&:before': {
        color: colors.evening,
        content: '"»"',
        left: 0,
        position: 'absolute',
    },
    ...fontSizes[1.5],
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    marginLeft: sizes[1.25],
})

export default LI
