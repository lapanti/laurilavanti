import { render, screen } from '@testing-library/react'
import React from 'react'

import { contactInfoLinks } from '../../../../tests/contactInfo.mock'
import ContactInfoLink from './ContactInfoLink'

describe('<ContactInfoLink />', () => {
    it.each(contactInfoLinks.map((link) => [link.title, link]))('should render %s', (_, link) => {
        const { container } = render(<ContactInfoLink link={link} />)

        if (link.url) {
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', link.url)
        } else {
            expect(screen.getByText(link.title)).toBeInTheDocument()
        }

        expect(container.firstChild).toMatchSnapshot()
    })
})
