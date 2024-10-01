import type { ContactInfoLink as ContactInfoLinkType } from '../../types/contentful'

import React from 'react'
import styled from 'styled-components'

import { sizes } from '../../lib/styles'
import ContactInfoLink from './contactInfo/ContactInfoLink'

interface Props {
    className?: string
    links: ContactInfoLinkType[]
}

const ContactInfoComponent = ({ className, links }: Props) => (
    <ul className={className}>
        {links.map((link) => (
            <ContactInfoLink key={link.title} link={link} />
        ))}
    </ul>
)

ContactInfoComponent.displayName = 'ContactInfo'

const ContactInfo = styled(ContactInfoComponent)({
    gridColumnStart: 3,
    marginTop: sizes[1],
})

export default ContactInfo
