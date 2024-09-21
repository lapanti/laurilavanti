import { render, screen } from '@testing-library/react'
/* eslint-disable-next-line import/no-named-as-default */
import userEvent from '@testing-library/user-event'
import React from 'react'

import { mainNav } from '../../../tests/mainNav.mock'
import Header from './Header'

describe('<Header />', () => {
    it('should render', () => {
        const { container } = render(<Header />)

        expect(screen.getByRole('link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/')

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
