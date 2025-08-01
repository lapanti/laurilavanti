import { FaBluesky, FaFacebook, FaLinkedin, FaThreads } from 'react-icons/fa6'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, sizes } from '../../lib/styles'
import ExternalLink from '../ExternalLink'

const Share = styled.span({
    marginRight: sizes[0.5],
})

const ExtLink = styled(ExternalLink)({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginRight: sizes[0.5],
})

const logoStyles = {
    display: 'inline-block',
    height: sizes[1],
    width: sizes[1],
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
    shareUrl: string
    title: string
    ariaLabel: string
}

const SocialShareComponent = ({ className, shareUrl, title, ariaLabel }: Props): JSX.Element => (
    <aside aria-label={ariaLabel} className={className}>
        <Share>Jaa:</Share>
        <ExtLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(shareUrl)}`} title="Jaa Facebookissa">
            <Facebook />
        </ExtLink>
        <ExtLink
            href={`https://threads.net/intent/post?text=${encodeURI(title)}%20${encodeURI(shareUrl)}`}
            title="Jaa Threadsissä"
        >
            <Threads />
        </ExtLink>
        <ExtLink
            href={`https://bsky.app/intent/compose?text=${encodeURI(title)}%20${encodeURI(shareUrl)}`}
            title="Jaa Blueskyssa"
        >
            <Bluesky />
        </ExtLink>
        <ExtLink
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(shareUrl)}`}
            title="Jaa LinkedInissä"
        >
            <LinkedIn />
        </ExtLink>
    </aside>
)

SocialShareComponent.displayName = 'SocialShare'

const SocialShare = styled(SocialShareComponent)({
    display: 'flex',
    flexDirection: 'row',
    gridColumnStart: 3,
    marginBottom: sizes[2],
    marginTop: sizes[1],
})

export default SocialShare
