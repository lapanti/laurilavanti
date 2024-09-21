import { render } from '@testing-library/react'
import React from 'react'

import Header from './Header'

describe('<Header />', () => {
    it('should render', () => {
        const { container } = render(<Header />)
        /**
 * These don't work until we make mobile version
            expect(screen.getByRole('link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/')

            mainNav.links.forEach((link) =>
                expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
            )*/

        expect(container.firstChild).toMatchSnapshot()
    })
})
