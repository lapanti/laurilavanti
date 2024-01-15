import React from 'react'
import styled from 'styled-components'

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
    <a className={className} href={href} target="_blank" title={title} rel={`${rel ?? ''} noopener noreferrer`}>
        {children}
    </a>
)

ExternalLinkComponent.displayName = 'ExternalLink'

const ExternalLink = styled(ExternalLinkComponent)({
    color: colors.moss,
    textDecoration: 'underline',
})

export default ExternalLink
