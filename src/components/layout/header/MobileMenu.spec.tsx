import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import config from '../../../../gatsby-config'
import { mainNav } from '../../../../tests/mainNav.mock'
import MobileMenu from './MobileMenu'

describe('<MobileMenu />', () => {
    const renderHelper = () => render(<MobileMenu links={mainNav.links} />)

    it('should render', () => {
        const { container } = renderHelper()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render main link', () => {
        renderHelper()

        expect(screen.getByRole('link', { name: `${config?.siteMetadata?.title ?? ''}` })).toHaveAttribute('href', '/')
    })

    it('should render menu button', () => {
        renderHelper()

        expect(screen.getByRole('button', { name: /Avaa valikko/i })).toBeEnabled()
    })

    it('should render given links', () => {
        renderHelper()

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )
    })

    it('should open the menu', async () => {
        const user = userEvent.setup()
        renderHelper()

        await user.click(screen.getByRole('button', { name: /Avaa valikko/i }))

        expect(screen.getByRole('button', { name: /Sulje valikko/i })).toBeEnabled()
        expect(screen.queryByRole('button', { name: /Avaa valikko/i })).toBeNull()

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )
    })
})
