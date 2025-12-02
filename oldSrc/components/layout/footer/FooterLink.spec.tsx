import { render, screen } from '@testing-library/react'

import { footerNav } from '../../../../tests/footerNav.mock'
import FooterLink from './FooterLink'

describe('<FooterLink />', () => {
    describe.each(footerNav.links.map((link) => [link.title, link]))('%s link', (_, link) => {
        it('should render', () => {
            const { container } = render(<FooterLink link={link} />)

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render the link', () => {
            render(<FooterLink link={link} />)

            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', link.url)
        })
    })
})
