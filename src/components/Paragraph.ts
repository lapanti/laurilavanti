import styled from 'styled-components'

import { fontFamilies, fontSizes, fontWeights, sizes } from '../lib/styles'

const Paragraph = styled.p({
    ...fontSizes.l,
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    marginTop: sizes[4],
    marginBottom: sizes[4],
})

export default Paragraph
