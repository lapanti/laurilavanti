import React from 'react'
import tw from 'twin.macro'

interface Props {
    className?: string
    href: string
}

const ExternalLinkComponent = ({ className, href, children }: React.PropsWithChildren<Props>): JSX.Element => (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
)

ExternalLinkComponent.displayName = 'ExternalLink'

const ExternalLink = tw(ExternalLinkComponent)`
    text-link no-underline hover:underline active:underline text-base
`

export default ExternalLink
