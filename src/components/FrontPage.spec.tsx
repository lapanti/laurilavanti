import { render, screen } from '@testing-library/react'
import React from 'react'

import { frontPage } from '../../tests/pages.mock'
import FrontPage from './FrontPage'

describe('<FrontPage />', () => {
    it('should render', () => {
        const { container } = render(<FrontPage data={{ contentfulPage: frontPage }} pageContext={{ slug: 'index' }} />)

        expect(screen.getByRole('heading', { name: frontPage.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })
})
