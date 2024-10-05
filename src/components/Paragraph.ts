import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { fontFamilies, fontSizes, fontWeights, sizes } from '../lib/styles'

const Paragraph = styled.p({
    ...fontSizes[1.5],
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    marginBottom: sizes[1],
    marginTop: sizes[1],
})

export default Paragraph
