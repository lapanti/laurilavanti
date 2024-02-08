import { render, screen } from '@testing-library/react'
/* eslint-disable-next-line import/no-named-as-default */
import userEvent from '@testing-library/user-event'
import React from 'react'

import { mainNav } from '../../../../tests/mainNav.mock'
import MobileNavigation from './MobileNavigation'

describe('<MobileNavigation />', () => {
    it('should render', () => {
        const { container } = render(<MobileNavigation links={mainNav.links} />)

        expect(screen.getByRole('heading', { name: /Lauri Lavanti/i })).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Avaa valikko/i })).toBeEnabled()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render front page', () => {
        const { container } = render(<MobileNavigation isFrontPage links={mainNav.links} />)

        expect(screen.queryByRole('heading', { name: /Lauri Lavanti/i })).not.toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Avaa valikko/i })).toBeEnabled()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render opened menu', async () => {
        const user = userEvent.setup()

        const { container } = render(<MobileNavigation links={mainNav.links} isFrontPage={false} />)

        expect(screen.getByRole('heading', { name: /Lauri Lavanti/i })).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: /Avaa valikko/i }))

        expect(screen.getByRole('button', { name: /Sulje valikko/i })).toBeEnabled()

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render empty menu', async () => {
        const user = userEvent.setup()

        const { container } = render(<MobileNavigation links={[]} isFrontPage={false} />)

        expect(screen.getByRole('heading', { name: /Lauri Lavanti/i })).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: /Avaa valikko/i }))

        expect(screen.getByRole('button', { name: /Sulje valikko/i })).toBeEnabled()

        expect(screen.queryAllByRole('link')).toHaveLength(0)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should open and close the menu', async () => {
        const user = userEvent.setup()

        const { container } = render(<MobileNavigation isFrontPage={false} links={mainNav.links} />)

        await user.click(screen.getByRole('button', { name: /Avaa valikko/i }))

        const closeButton = screen.getByRole('button', { name: /Sulje valikko/i })

        expect(closeButton).toBeEnabled()

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )

        await user.click(closeButton)

        expect(screen.queryByRole('link', { name: mainNav.links[0].title })).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })
})
