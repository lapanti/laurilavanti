import type { ContactInfoLink } from '../../../types/contentful'

import React from 'react'
import { FaBluesky, FaFacebook, FaInstagram, FaLinkedin, FaMastodon, FaThreads } from 'react-icons/fa6'
import styled from 'styled-components'

import { colors, sizes, transitions } from '../../../lib/styles'

const Link = styled.a({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',

    '> *': {
        fill: colors.gray,
        height: sizes[2.25],
        width: sizes[2.25],
        ...transitions.base,
    },
})

const iconToHoverColor = (icon: ContactInfoLink['icon']): string | undefined => {
    switch (icon) {
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
        case 'bluesky':
            return colors.bluesky
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
        case 'mastodon':
            return FaMastodon
        case 'bluesky':
            return FaBluesky
    }
}

interface Props {
    className?: string
    link: ContactInfoLink
}

const FooterLinkComponent = ({ className, link }: Props): JSX.Element | null => {
    const Icon = iconToIconComponent(link.icon)
    return link.url ? (
        <li className={className}>
            <Link href={link.url} title={link.title} target="_blank" rel="me noopener noreferrer">
                {Icon && <Icon />}
            </Link>
        </li>
    ) : null
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
