import React from 'react'
import tw from 'twin.macro'

import ExternalLink from '../ExternalLink'

const Share = tw.span`
    mr-2
`

const ExtLink = tw(ExternalLink)`
    mr-2 flex flex-row items-center
`

const Svg = tw.svg`
    inline-block h-4 w-4 fill-current
`

const Fb = tw(Svg)`text-fb`

const Twitter = tw(Svg)`text-twitter`

const LinkedIn = tw(Svg)`text-linkedin`

interface Props {
    className?: string
    siteUrl: string
    title: string
}

const SocialShareComponent = ({ className, siteUrl, title }: Props): JSX.Element => (
    <aside className={className}>
        <Share>Jaa:</Share>
        <ExtLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(siteUrl)}`} title="Jaa Facebookissa">
            <Fb>
                <use xlinkHref="#icon-facebook" />
            </Fb>
        </ExtLink>
        <ExtLink
            href={`https://twitter.com/intent/tweet?text=${encodeURI(title)}%20${encodeURI(siteUrl)}`}
            title="Jaa Twitterissä"
        >
            <Twitter>
                <use xlinkHref="#icon-twitter" />
            </Twitter>
        </ExtLink>
        <ExtLink
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(siteUrl)}`}
            title="Jaa LinkedInissä"
        >
            <LinkedIn>
                <use xlinkHref="#icon-linkedin" />
            </LinkedIn>
        </ExtLink>
    </aside>
)

SocialShareComponent.displayName = 'SocialShare'

const SocialShare = tw(SocialShareComponent)`
    col-start-3 flex flex-row mt-4 mb-8
`

export default SocialShare
