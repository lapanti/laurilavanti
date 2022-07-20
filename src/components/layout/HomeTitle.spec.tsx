import { render, screen } from '@testing-library/react'
import React from 'react'

import HomeTitle from './HomeTitle'

describe('<HomeTitle />', () => {
    it('should render', () => {
        const { container } = render(<HomeTitle />)

        expect(screen.getByRole('heading', { name: /Lauri Lavanti/i })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
