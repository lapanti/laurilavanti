import { render, screen } from '@testing-library/react'

import { mainNav } from '../../../tests/mainNav.mock'
import Header from './Header'

describe('<Header />', () => {
    it('should render', () => {
        const { container } = render(<Header />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render all links', () => {
        render(<Header />)

        mainNav.links.forEach((link) =>
            expect(screen.getAllByRole('link', { name: link.title }).length).toBeGreaterThanOrEqual(1)
        )
    })
})
