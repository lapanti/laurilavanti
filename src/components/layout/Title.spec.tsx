import { render, screen } from '@testing-library/react'
import React from 'react'

import Title from './Title'

describe('<Title />', () => {
    const title = 'My title'

    it('should render', () => {
        const { container } = render(<Title title={title} />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
