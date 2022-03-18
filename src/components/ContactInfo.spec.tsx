import { render, screen } from '@testing-library/react'
import React from 'react'

import ContactInfo from './ContactInfo'

describe('<ContactInfo />', () => {
    it('should render', () => {
        const { container } = render(<ContactInfo />)

        expect(screen.getByText('lauri.lavanti@kirkkonummi.fi')).toBeInTheDocument()

        expect(screen.getByRole('link', { name: /Facebook/i })).toHaveAttribute(
            'href',
            'https://www.facebook.com/laurilavanti'
        )

        expect(screen.getByRole('link', { name: /Twitter/i })).toHaveAttribute(
            'href',
            'https://twitter.com/laurilavanti'
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
