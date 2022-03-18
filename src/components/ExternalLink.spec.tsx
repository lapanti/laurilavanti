import { render, screen } from '@testing-library/react'
import React from 'react'

import ExternalLink from './ExternalLink'

describe('<ExternalLink />', () => {
    it('should render', () => {
        const href = 'https://github.com/lapanti'
        const title = 'title'
        const children = 'children'
        const { container } = render(
            <ExternalLink href={href} title={title}>
                {children}
            </ExternalLink>
        )

        const link = screen.getByRole('link', { name: title })
        expect(link).toHaveAttribute('href', href)
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        expect(link).toHaveAttribute('target', '_blank')

        expect(container.firstChild).toMatchSnapshot()
    })
})
