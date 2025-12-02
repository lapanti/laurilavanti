import type { ReactNode } from 'react'

import '@fontsource/ibm-plex-mono/400-italic.css'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, sizes, typographics } from '../../lib/styles'

interface Props {
    className?: string
    children: ReactNode
}

const BlockQuoteComponent = ({ className, children }: Props): JSX.Element => (
    <blockquote className={className}>{children}</blockquote>
)

BlockQuoteComponent.displayName = 'BlockQuote'

const BlockQuote = styled(BlockQuoteComponent)({
    ...typographics.blockQuote,
    borderLeftColor: colors.sand,
    borderLeftWidth: '4px',
    gridColumnStart: 3,
    paddingBottom: sizes[0.5],
    paddingLeft: sizes[0.5],
    paddingTop: sizes[0.5],
})

export default BlockQuote
