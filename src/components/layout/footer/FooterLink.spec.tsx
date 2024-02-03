import { render, screen } from '@testing-library/react'
import React from 'react'

import { mailLink } from '../../../../tests/contactInfo.mock'
import { footerNav } from '../../../../tests/footerNav.mock'
import FooterLink from './FooterLink'

describe('<FooterLink />', () => {
    it.each(footerNav.links.map((link) => [link.title, link]))('should render %s', (_, link) => {
        const { container } = render(<FooterLink link={link} />)

        expect(screen.getByRole('link', { name: link.title! })).toHaveAttribute('href', link.url)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render null when unsupported link', () => {
        const link = mailLink
        const { container } = render(<FooterLink link={link} />)

        expect(screen.queryByRole('link', { name: link.title! })).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })
})
