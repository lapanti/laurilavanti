import { render, screen } from '@testing-library/react'
import React from 'react'

import { contactInfoLinks } from '../../../tests/contactInfo.mock'
import ContactInfoLink from './ContactInfoLink'

describe('<ContactInfoLink />', () => {
    it.each(contactInfoLinks.map((link) => [link.title, link]))('should render %s', (title, link) => {
        const { container } = render(<ContactInfoLink link={link} />)

        expect(screen.getByRole('link', { name: title })).toHaveAttribute('href', link.url)

        expect(container.firstChild).toMatchSnapshot()
    })
})
