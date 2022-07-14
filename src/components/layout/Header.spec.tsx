import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { mainNav } from '../../../tests/mainNav.mock'
import Header from './Header'

describe('<Header />', () => {
    it('should render', () => {
        const { container } = render(<Header />)

        expect(screen.getByRole('button', { name: /Open navigation menu/i })).toBeEnabled()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render opened menu', async () => {
        const user = userEvent.setup()

        const { container } = render(<Header />)

        await user.click(screen.getByRole('button', { name: /Open navigation menu/i }))

        expect(screen.getByRole('button', { name: /Close navigation menu/i })).toBeEnabled()

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should open and close the menu', async () => {
        const user = userEvent.setup()

        const { container } = render(<Header />)

        await user.click(screen.getByRole('button', { name: /Open navigation menu/i }))

        const closeButton = screen.getByRole('button', { name: /Close navigation menu/i })

        expect(closeButton).toBeEnabled()

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )

        await user.click(closeButton)

        expect(screen.queryByRole('link', { name: mainNav.links[0].title })).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })
})
