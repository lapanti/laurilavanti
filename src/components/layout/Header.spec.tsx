import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mainNav } from '../../../tests/mainNav.mock'
import Header from './Header'

describe('<Header />', () => {
    it('should render closed menu', () => {
        const { container } = render(<Header />)

        expect(screen.getByRole('button', { name: /Avaa valikko/i })).toBeEnabled()
        expect(screen.queryByRole('button', { name: /Sulje valikko/i })).toBeNull()

        expect(screen.getByRole('link', { name: /Lauri Lavanti$/i })).toHaveAttribute('href', '/')

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render open', async () => {
        const user = userEvent.setup()
        const { container } = render(<Header />)

        await user.click(screen.getByRole('button', { name: /Avaa valikko/i }))

        expect(screen.getByRole('button', { name: /Sulje valikko/i })).toBeEnabled()
        expect(screen.queryByRole('button', { name: /Avaa valikko/i })).toBeNull()

        expect(screen.getByRole('link', { name: /Lauri Lavanti$/i })).toHaveAttribute('href', '/')

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
