import { render, screen } from '@testing-library/react'

import MainNavigationLink from './MainNavigationLink'

describe('<MainNavigationLink />', () => {
    const title = 'Lauri Lavanti'

    it('should render', () => {
        const { container } = render(<MainNavigationLink title={title} />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render link that is hidden when current', () => {
        const { container } = render(<MainNavigationLink title={title} hideIfCurrent />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render the actual link', () => {
        render(<MainNavigationLink title={title} />)

        expect(screen.getByRole('link', { name: title })).toHaveAttribute('href', `/`)
    })
})
