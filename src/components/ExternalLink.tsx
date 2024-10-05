/** This link actually has both target=_blank and rel=noopener, but eslint doesn't realize it */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors } from '../lib/styles'

interface Props {
    className?: string
    href: string
    title?: string
    rel?: string
}

const ExternalLinkComponent = ({
    className,
    href,
    title,
    rel,
    children,
}: React.PropsWithChildren<Props>): JSX.Element => (
    <a className={className} href={href} rel={`${rel ?? ''} noopener noreferrer`} target="_blank" title={title}>
        {children}
    </a>
)

ExternalLinkComponent.displayName = 'ExternalLink'

const ExternalLink = styled(ExternalLinkComponent)({
    color: colors.moss,
    textDecoration: 'underline',
})

export default ExternalLink
