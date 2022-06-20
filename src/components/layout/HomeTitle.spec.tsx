import { render, screen } from '@testing-library/react'
import React from 'react'

import HomeTitle from './HomeTitle'

describe('<HomeTitle />', () => {
    it('should render', () => {
        const { container } = render(<HomeTitle />)

        expect(screen.getByRole('term', { name: /Lauri Lavanti/i })).toBeInTheDocument()

        expect(screen.getByRole('definition', { name: /Isä/i })).toBeInTheDocument()
        expect(screen.getByRole('definition', { name: /Kirkkonummelainen/i })).toBeInTheDocument()
        expect(screen.getByRole('definition', { name: /Ohjelmistokehittäjä/i })).toBeInTheDocument()
        expect(screen.getByRole('definition', { name: /Diplomi-insinööri/i })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
