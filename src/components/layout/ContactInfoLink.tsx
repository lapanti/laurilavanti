import type { ContactInfoLink as ContactInfoLinkType } from '../../types/contentful'

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

import { colors, sizes } from '../../lib/styles'
import ExternalLink from '../ExternalLink'
import TikTok from '../TikTok'

const RowExternalLink = styled(ExternalLink)({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
})

const logoStyles = { height: sizes[1], marginRight: sizes[0.25], width: sizes[1] }

const Bluesky = styled(FaBluesky)(logoStyles, { fill: colors.bluesky })

const Envelope = styled(FaEnvelope)(logoStyles, { fill: colors.black })

const Facebook = styled(FaFacebook)(logoStyles, { fill: colors.facebook })

const Instagram = styled(FaInstagram)(logoStyles, { fill: colors.instagramGradient })

const LinkedIn = styled(FaLinkedin)(logoStyles, { fill: colors.linkedin })

const Mastodon = styled(FaMastodon)(logoStyles, { fill: colors.mastodon })

const Threads = styled(FaSquareThreads)(logoStyles, { fill: colors.threads })

const StyledTikTok = styled(TikTok)(logoStyles)

interface Props {
    className?: string
    link: ContactInfoLinkType
}

const ContactInfoLinkComponent = ({ className, link }: Props): JSX.Element => (
    <RowExternalLink className={className} href={link.url} rel="me">
        {link.icon === 'bluesky' && <Bluesky />}
        {link.icon === 'envelope' && <Envelope />}
        {link.icon === 'facebook' && <Facebook />}
        {link.icon === 'instagram' && <Instagram />}
        {link.icon === 'linkedin' && <LinkedIn />}
        {link.icon === 'mastodon' && <Mastodon />}
        {link.icon === 'threads' && <Threads />}
        {link.icon === 'tiktok' && <StyledTikTok noHover />}
        <span>{link.title}</span>
    </RowExternalLink>
)

ContactInfoLinkComponent.displayName = 'ContactInfoLink'

const ContactInfoLink = styled(ContactInfoLinkComponent)({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
})

export default ContactInfoLink
