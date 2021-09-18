import React from 'react'
import tw from 'twin.macro'

import Link from './Link'

interface Props {
    className?: string
    href: string
}

const ExternalLinkComponent = ({ className, href, children }: React.PropsWithChildren<Props>): JSX.Element => (
    <Link className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </Link>
)

ExternalLinkComponent.displayName = 'ExternalLink'

const ExternalLink = tw(ExternalLinkComponent)``

export default ExternalLink
