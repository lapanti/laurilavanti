import styled from 'styled-components'

import { colors } from '../../lib/styles'

const Link = styled.a({
    color: colors.moss,
    textDecoration: 'none',
    ':hover, :active': {
        textDecoration: 'underline',
    },
})

export default Link
