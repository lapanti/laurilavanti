import type { ContactInfoLink as ContactInfoLinkType } from '../../types/contentful'

import React from 'react'
import tw from 'twin.macro'

import ContactInfoLink from './contactInfo/ContactInfoLink'

interface Props {
    className?: string
    links: ContactInfoLinkType[]
}

const ContactInfoComponent = ({ className, links }: Props) => (
    <ul className={className}>
        {links.map((link) => (
            <ContactInfoLink link={link} key={link.title} />
        ))}
    </ul>
)

ContactInfoComponent.displayName = 'ContactInfo'

const ContactInfo = tw(ContactInfoComponent)`
    col-start-3 mt-4
`

export default ContactInfo
