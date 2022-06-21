import type { ContactInfoLink as ContactInfoLinkType } from '../../../types/contentful'

import React from 'react'
import tw from 'twin.macro'

import ExternalLink from '../../ExternalLink'

const RowExternalLink = tw(ExternalLink)` flex flex-row items-center`

const Svg = tw.svg` w-4 h-4 mr-2 fill-current`

const Facebook = tw(Svg)` text-fb`

const Twitter = tw(Svg)` text-twitter`

const LinkedIn = tw(Svg)` text-linkedin`

interface Props {
    className?: string
    link: ContactInfoLinkType
}

const ContactInfoLinkComponent = ({ className, link }: Props): JSX.Element => {
    const Wrapper = link.url ? RowExternalLink : React.Fragment

    return (
        <li className={className}>
            {/* @ts-expect-error typescript doesn't like this */}
            <Wrapper {...(link.url ? { href: link.url } : {})}>
                {link.icon === 'envelope' && (
                    <Svg>
                        <use xlinkHref="#icon-envelope" />
                    </Svg>
                )}
                {link.icon === 'facebook' && (
                    <Facebook>
                        <use xlinkHref="#icon-facebook" />
                    </Facebook>
                )}
                {link.icon === 'twitter' && (
                    <Twitter>
                        <use xlinkHref="#icon-twitter" />
                    </Twitter>
                )}
                {link.icon === 'linkedin' && (
                    <LinkedIn>
                        <use xlinkHref="#icon-linkedin" />
                    </LinkedIn>
                )}
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
