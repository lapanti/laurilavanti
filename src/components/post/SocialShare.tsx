import React from 'react'
import { FaBluesky, FaFacebook, FaLinkedin, FaThreads } from 'react-icons/fa6'
import styled from 'styled-components'

import { colors, sizes } from '../../lib/styles'
import ExternalLink from '../ExternalLink'

const Share = styled.span({
    marginRight: sizes[2],
})

const ExtLink = styled(ExternalLink)({
    marginRight: sizes[2],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

const logoStyles = {
    display: 'inline-block',
    height: sizes[4],
    width: sizes[4],
}

const Facebook = styled(FaFacebook)(logoStyles, {
    color: colors.facebook,
})

const Threads = styled(FaThreads)(logoStyles, {
    color: colors.threads,
})

const Bluesky = styled(FaBluesky)(logoStyles, {
    color: colors.bluesky,
})

const LinkedIn = styled(FaLinkedin)(logoStyles, {
    color: colors.linkedin,
})

interface Props {
    className?: string
    siteUrl: string
    title: string
    ariaLabel: string
}

const SocialShareComponent = ({ className, siteUrl, title, ariaLabel }: Props): JSX.Element => (
    <aside className={className} aria-label={ariaLabel}>
        <Share>Jaa:</Share>
        <ExtLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(siteUrl)}`} title="Jaa Facebookissa">
            <Facebook />
        </ExtLink>
        <ExtLink
            href={`https://threads.net/intent/post?text=${encodeURI(title)}%20${encodeURI(siteUrl)}`}
            title="Jaa Threadsissä"
        >
            <Threads />
        </ExtLink>
        <ExtLink
            href={`https://bsky.app/intent/compose?text=${encodeURI(title)}%20${encodeURI(siteUrl)}`}
            title="Jaa Blueskyssa"
        >
            <Bluesky />
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

const SocialShare = styled(SocialShareComponent)({
    gridColumnStart: 3,
    display: 'flex',
    flexDirection: 'row',
    marginTop: sizes[4],
    marginBottom: sizes[8],
})

export default SocialShare
