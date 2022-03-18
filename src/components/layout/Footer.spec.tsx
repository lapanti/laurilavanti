import { render, screen } from '@testing-library/react'
import React from 'react'

import Footer from './Footer'

describe('<Footer />', () => {
    it('should render', () => {
        const { container } = render(<Footer />)

        expect(screen.getByRole('link', { name: /Facebook/i })).toHaveAttribute(
            'href',
            'https://www.facebook.com/laurilavanti/'
        )

        expect(screen.getByRole('link', { name: /Twitter/i })).toHaveAttribute(
            'href',
            'https://twitter.com/laurilavanti'
        )

        expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
            'href',
            'https://www.linkedin.com/in/lapanti/'
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
