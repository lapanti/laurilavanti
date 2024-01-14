import type { ContactInfoLink as ContactInfoLinkType } from '../../../types/contentful'

import React from 'react'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMastodon, FaXTwitter } from 'react-icons/fa6'
import tw from 'twin.macro'

import ExternalLink from '../../ExternalLink'

const RowExternalLink = tw(ExternalLink)` flex flex-row items-center`

const Envelope = tw(FaEnvelope)` w-4 h-4 mr-2`

const Facebook = tw(FaFacebook)` w-4 h-4 mr-2 fill-fb`

const XTwitter = tw(FaXTwitter)` w-4 h-4 mr-2 fill-black`

const Instagram = tw(FaInstagram)` w-4 h-4 mr-2 fill-[url(#instagram-gradient)]`

const LinkedIn = tw(FaLinkedin)` w-4 h-4 mr-2 fill-linkedin`

const Mastodon = tw(FaMastodon)` w-4 h-4 mr-2 fill-mastodon`

interface Props {
    className?: string
    link: ContactInfoLinkType
}

const ContactInfoLinkComponent = ({ className, link }: Props): JSX.Element => {
    const Wrapper = link.url ? RowExternalLink : React.Fragment

    return (
        <li className={className}>
            {/* @ts-expect-error typescript doesn't like this */}
            <Wrapper {...(link.url ? { href: link.url, rel: 'me' } : {})}>
                {link.icon === 'envelope' && <Envelope />}
                {link.icon === 'facebook' && <Facebook />}
                {link.icon === 'twitter' && <XTwitter />}
                {link.icon === 'instagram' && <Instagram />}
                {link.icon === 'linkedin' && <LinkedIn />}
                {link.icon === 'mastodon' && <Mastodon />}
                <span>{link.title}</span>
            </Wrapper>
        </li>
    )
}

ContactInfoLinkComponent.displayName = 'ContactInfoLink'

const ContactInfoLink = tw(ContactInfoLinkComponent)`
    flex flex-row items-center
`

export default ContactInfoLink
