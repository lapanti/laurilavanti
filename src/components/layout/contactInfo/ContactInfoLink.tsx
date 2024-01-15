import type { ContactInfoLink as ContactInfoLinkType } from '../../../types/contentful'

import React from 'react'
import {
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaMastodon,
    FaSquareThreads,
    FaXTwitter,
} from 'react-icons/fa6'
import styled from 'styled-components'

import { colors, spacing } from '../../../lib/styles'
import ExternalLink from '../../ExternalLink'

const RowExternalLink = styled(ExternalLink)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

const logoStyles = { width: spacing[4], height: spacing[4], marginRight: spacing[2] }

const Envelope = styled(FaEnvelope)(logoStyles)

const Facebook = styled(FaFacebook)(logoStyles, { fill: colors.facebook })

const XTwitter = styled(FaXTwitter)(logoStyles, { fill: colors.xtwitter })

const Threads = styled(FaSquareThreads)(logoStyles, { fill: colors.threads })

const Instagram = styled(FaInstagram)(logoStyles, { fill: colors.instagramGradient })

const LinkedIn = styled(FaLinkedin)(logoStyles, { fill: colors.linkedin })

const Mastodon = styled(FaMastodon)(logoStyles, { fill: colors.mastodon })

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
                {link.icon === 'threads' && <Threads />}
                {link.icon === 'instagram' && <Instagram />}
                {link.icon === 'linkedin' && <LinkedIn />}
                {link.icon === 'mastodon' && <Mastodon />}
                <span>{link.title}</span>
            </Wrapper>
        </li>
    )
}

ContactInfoLinkComponent.displayName = 'ContactInfoLink'

const ContactInfoLink = styled(ContactInfoLinkComponent)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

export default ContactInfoLink
