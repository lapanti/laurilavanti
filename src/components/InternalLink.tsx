import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

import { colors, transitions } from '../lib/styles'

const InternalLink = styled(GatsbyLink)({
    color: colors.moss,
    textDecoration: 'none',
    ...transitions.base,

    ':hover, :active, :focus': {
        textDecoration: 'underline',
    },
})

export default InternalLink
