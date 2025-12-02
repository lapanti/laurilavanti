import { render, screen } from '@testing-library/react'

import config from '../../../../../gatsby-config'
import MainNavigationLink from './MainNavigationLink'

describe('<MainNavigationLink />', () => {
    it('should render', () => {
        const { container } = render(<MainNavigationLink />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render the actual link', () => {
        render(<MainNavigationLink />)

        expect(screen.getByRole('link', { name: `${config?.siteMetadata?.title ?? ''}` })).toHaveAttribute('href', `/`)
    })
})
