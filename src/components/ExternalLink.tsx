import React from 'react'
import styled from 'styled-components'

import Link from './externalLink/Link'

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
    <Link className={className} href={href} target="_blank" title={title} rel={`${rel ?? ''} noopener noreferrer`}>
        {children}
    </Link>
)

ExternalLinkComponent.displayName = 'ExternalLink'

const ExternalLink = styled(ExternalLinkComponent)({})

export default ExternalLink
