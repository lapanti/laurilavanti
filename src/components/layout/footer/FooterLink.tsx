import type { FooterNav } from '../../../types/contentful'

import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaMastodon, FaThreads, FaXTwitter } from 'react-icons/fa6'
import styled from 'styled-components'

import { colors, sizes, transitions } from '../../../lib/styles'

const Link = styled.a({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',

    '> *': {
        fill: colors.gray,
        height: sizes[9],
        width: sizes[9],
        ...transitions.base,
    },
})

const iconToHoverColor = (icon: FooterNav['links'][number]['icon']): string | undefined => {
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
        case 'twitter':
            return colors.xtwitter
    }
}

const iconToIconComponent = (icon: FooterNav['links'][number]['icon']) => {
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
        case 'twitter':
            return FaXTwitter
    }
}

interface Props {
    className?: string
    link: FooterNav['links'][number]
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
