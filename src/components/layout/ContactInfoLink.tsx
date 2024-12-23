import type { ContactInfoLink as ContactInfoLinkType } from '../../types/contentful'

import { FaBluesky, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaSquareThreads } from 'react-icons/fa6'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, sizes } from '../../lib/styles'
import ExternalLink from '../ExternalLink'

const RowExternalLink = styled(ExternalLink)({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
})

const logoStyles = { height: sizes[1], marginRight: sizes[0.5], width: sizes[1] }

const Envelope = styled(FaEnvelope)(logoStyles, { fill: colors.black })

const Facebook = styled(FaFacebook)(logoStyles, { fill: colors.facebook })

const Threads = styled(FaSquareThreads)(logoStyles, { fill: colors.threads })

const Instagram = styled(FaInstagram)(logoStyles, { fill: colors.instagramGradient })

const LinkedIn = styled(FaLinkedin)(logoStyles, { fill: colors.linkedin })

const Bluesky = styled(FaBluesky)(logoStyles, { fill: colors.bluesky })

interface Props {
    className?: string
    link: ContactInfoLinkType
}

const ContactInfoLinkComponent = ({ className, link }: Props): JSX.Element => (
    <RowExternalLink className={className} href={link.url} rel="me">
        {link.icon === 'envelope' && <Envelope />}
        {link.icon === 'facebook' && <Facebook />}
        {link.icon === 'bluesky' && <Bluesky />}
        {link.icon === 'threads' && <Threads />}
        {link.icon === 'instagram' && <Instagram />}
        {link.icon === 'linkedin' && <LinkedIn />}
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
