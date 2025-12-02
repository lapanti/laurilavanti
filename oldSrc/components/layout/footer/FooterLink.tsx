import type { ContactInfoLink } from '../../../types/contentful'

import { FaBluesky, FaFacebook, FaInstagram, FaLinkedin, FaMastodon, FaThreads } from 'react-icons/fa6'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, sizes, transitions } from '../../../lib/styles'
import TikTok from '../../TikTok'

const Link = styled.a({
    '> *': {
        fill: colors.gray,
        height: sizes[1.75],
        width: sizes[1.75],
        ...transitions.base,
        [breakpoints[1200].min]: {
            height: sizes[2.25],
            width: sizes[2.25],
        },
    },
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
})

const iconToHoverColor = (icon: ContactInfoLink['icon']): string | undefined => {
    switch (icon) {
        case 'bluesky':
            return colors.bluesky
        case 'facebook':
            return colors.facebook
        case 'instagram':
            return colors.instagramGradient
        case 'linkedin':
            return colors.linkedin
        case 'mastodon':
            return colors.mastodon
        case 'threads':
            return colors.threads
        case 'tiktok':
            return undefined
    }
}

const iconToIconComponent = (icon: ContactInfoLink['icon']) => {
    switch (icon) {
        case 'facebook':
            return FaFacebook
        case 'threads':
            return FaThreads
        case 'instagram':
            return FaInstagram
        case 'linkedin':
            return FaLinkedin
        case 'bluesky':
            return FaBluesky
        case 'mastodon':
            return FaMastodon
        case 'tiktok':
            return TikTok
    }
}

interface Props {
    className?: string
    link: ContactInfoLink
}

const FooterLinkComponent = ({ className, link }: Props): JSX.Element => {
    const Icon = iconToIconComponent(link.icon)

    return (
        <li className={className}>
            <Link href={link.url} rel="me noopener noreferrer" target="_blank" title={link.title}>
                {Icon && <Icon />}
            </Link>
        </li>
    )
}

FooterLinkComponent.displayName = 'FooterLink'

const FooterLink = styled(FooterLinkComponent)(
    {
        padding: sizes[0],
    },
    ({ link: { icon } }) => ({
        ':hover, :focus': {
            fill: iconToHoverColor(icon),
        },
    })
)

export default FooterLink
