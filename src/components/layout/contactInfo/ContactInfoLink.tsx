import type { ContactInfoLink as ContactInfoLinkType } from '../../../types/contentful'

import React from 'react'
import {
    FaBluesky,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaMastodon,
    FaSquareThreads,
} from 'react-icons/fa6'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, sizes } from '../../../lib/styles'
import ExternalLink from '../../ExternalLink'

const RowExternalLink = styled(ExternalLink)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

const logoStyles = { width: sizes[1], height: sizes[1], marginRight: sizes[0.5] }

const Envelope = styled(FaEnvelope)(logoStyles)

const Facebook = styled(FaFacebook)(logoStyles, { fill: colors.facebook })

const Threads = styled(FaSquareThreads)(logoStyles, { fill: colors.threads })

const Instagram = styled(FaInstagram)(logoStyles, { fill: colors.instagramGradient })

const LinkedIn = styled(FaLinkedin)(logoStyles, { fill: colors.linkedin })

const Mastodon = styled(FaMastodon)(logoStyles, { fill: colors.mastodon })

const Bluesky = styled(FaBluesky)(logoStyles, { fill: colors.bluesky })

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
                {link.icon === 'bluesky' && <Bluesky />}
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
