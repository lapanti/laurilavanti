import { render, screen } from '@testing-library/react'

import { footerNav } from '../../../../tests/footerNav.mock'
import FooterLink from './FooterLink'

describe('<FooterLink />', () => {
    it.each(footerNav.links.map((link) => [link.title, link]))('should render %s', (_, link) => {
        const { container } = render(<FooterLink link={link} />)

        expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', link.url)

        expect(container.firstChild).toMatchSnapshot()
    })
})
