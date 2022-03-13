import { render, screen } from '@testing-library/react'
import React from 'react'

import FourZeroFour from './404'

describe.skip('<404 />', () => {
    it('should render', () => {
        const { container } = render(<FourZeroFour />)

        expect(screen.getByText('Etsimääsi sivua ei valitettavasti löytynyt')).toBeInTheDocument()
        expect(container).toMatchInlineSnapshot()
    })
})
