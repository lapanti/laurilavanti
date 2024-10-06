import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, transitions } from '../lib/styles'

const InternalLink = styled(GatsbyLink)<{ $noHover?: boolean; $color?: string }>(
    {
        textDecoration: 'none',
        ...transitions.base,
    },
    ({ $color, $noHover }) => ({
        ':hover, :active, :focus': {
            textDecoration: $noHover ? 'none' : 'underline',
        },
        color: $color ?? colors.moss,
    })
)

export default InternalLink
