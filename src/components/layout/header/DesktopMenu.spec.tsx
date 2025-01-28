import { render, screen } from '@testing-library/react'

import config from '../../../../gatsby-config'
import { mainNav } from '../../../../tests/mainNav.mock'
import DesktopMenu from './DesktopMenu'

describe('<DesktopMenu />', () => {
    const renderHelper = () => render(<DesktopMenu links={mainNav.links} />)

    it('should render', () => {
        const { container } = renderHelper()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render main link', () => {
        renderHelper()

        expect(screen.getByRole('link', { name: `${config?.siteMetadata?.title ?? ''}` })).toHaveAttribute('href', '/')
    })

    it('should render given links', () => {
        renderHelper()

        mainNav.links.forEach((link) =>
            expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', `/${link.slug}/`)
        )
    })
})
