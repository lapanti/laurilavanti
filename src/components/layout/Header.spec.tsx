import { render, screen } from '@testing-library/react'
import React from 'react'

import Header from './Header'

describe('<Header />', () => {
    it('should render', () => {
        const { container } = render(<Header />)

        expect(screen.getByRole('link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', { name: /Minusta/i })).toHaveAttribute('href', '/minusta')
        expect(screen.getByRole('link', { name: /Blogi/i })).toHaveAttribute('href', '/blogi')
        expect(screen.getByRole('link', { name: /Ota yhteyttä/i })).toHaveAttribute('href', '/ota-yhteytta')

        expect(container.firstChild).toMatchSnapshot()
    })
})
