import type { ReactNode } from 'react'

import '@fontsource/ibm-plex-mono/400-italic.css'

import styled from 'styled-components'

import { colors, fontFamilies, fontSizes, fontWeights, sizes } from '../../lib/styles'

interface Props {
    className?: string
    children: ReactNode
}

const BlockQuoteComponent = ({ className, children }: Props): JSX.Element => (
    <blockquote className={className}>{children}</blockquote>
)

BlockQuoteComponent.displayName = 'BlockQuote'

const BlockQuote = styled(BlockQuoteComponent)({
    borderLeftColor: colors.sand,
    borderLeftWidth: '4px',
    fontFamily: fontFamilies.mono,
    fontStyle: 'italic',
    fontWeight: fontWeights.normal,
    gridColumnStart: 3,
    paddingBottom: sizes[0.5],
    paddingLeft: sizes[0.5],
    paddingTop: sizes[0.5],
    ...fontSizes[1.5],
})

export default BlockQuote
