import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { sizes, typographics } from '../lib/styles'

const Paragraph = styled.p({
    ...typographics.body,
    marginBottom: sizes[1],
    marginTop: sizes[1],
})

export default Paragraph
