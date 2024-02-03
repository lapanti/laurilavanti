import { render, screen } from '@testing-library/react'
import React from 'react'

import { footerNav } from '../../../tests/footerNav.mock'
import Footer from './Footer'

describe('<Footer />', () => {
    it('should render', () => {
        const { container } = render(<Footer />)

        footerNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title! })).toHaveAttribute('href', link.url)
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
