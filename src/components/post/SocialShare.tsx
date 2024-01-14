import React from 'react'
import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import tw from 'twin.macro'

import ExternalLink from '../ExternalLink'

const Share = tw.span`
    mr-2
`

const ExtLink = tw(ExternalLink)`
    mr-2 flex flex-row items-center
`

const Facebook = tw(FaFacebook)` inline-block h-4 w-4 text-fb`

const XTwitter = tw(FaXTwitter)` inline-block h-4 w-4 text-black`

const LinkedIn = tw(FaLinkedin)` inline-block h-4 w-4 text-linkedin`

interface Props {
    className?: string
    siteUrl: string
    title: string
}

const SocialShareComponent = ({ className, siteUrl, title }: Props): JSX.Element => (
    <aside className={className}>
        <Share>Jaa:</Share>
        <ExtLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(siteUrl)}`} title="Jaa Facebookissa">
            <Facebook />
        </ExtLink>
        <ExtLink
            href={`https://twitter.com/intent/tweet?text=${encodeURI(title)}%20${encodeURI(siteUrl)}`}
            title="Jaa Xssä (ent. Twitterissä)"
        >
            <XTwitter />
        </ExtLink>
        <ExtLink
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(siteUrl)}`}
            title="Jaa LinkedInissä"
        >
            <LinkedIn />
        </ExtLink>
    </aside>
)

SocialShareComponent.displayName = 'SocialShare'

const SocialShare = tw(SocialShareComponent)`
    col-start-3 flex flex-row mt-4 mb-8
`

export default SocialShare
