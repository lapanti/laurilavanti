import styled from 'styled-components'

import { fontFamilies, fontSizes, fontWeights, sizes } from '../lib/styles'

const Paragraph = styled.p({
    ...fontSizes.l,
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    marginTop: sizes[1],
    marginBottom: sizes[1],
})

export default Paragraph
