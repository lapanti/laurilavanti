import { render, screen } from '@testing-library/react'
import React from 'react'

import ExternalLink from './ExternalLink'

describe('<ExternalLink />', () => {
    it('should render', () => {
        const href = 'https://github.com/lapanti'
        const title = 'title'
        const rel = 'jotain hassua'
        const children = 'children'
        const { container } = render(
            <ExternalLink href={href} title={title} rel={rel}>
                {children}
            </ExternalLink>
        )

        const link = screen.getByRole('link', { name: title })
        expect(link).toHaveAttribute('href', href)
        expect(link).toHaveAttribute('rel', `${rel} noopener noreferrer`)
        expect(link).toHaveAttribute('target', '_blank')

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render minimal', () => {
        const href = 'https://github.com/lapanti'
        const children = 'children'
        const { container } = render(<ExternalLink href={href}>{children}</ExternalLink>)

        const link = screen.getByRole('link', { name: children })
        expect(link).toHaveAttribute('href', href)
        expect(link).toHaveAttribute('rel', ` noopener noreferrer`)
        expect(link).toHaveAttribute('target', '_blank')

        expect(container.firstChild).toMatchSnapshot()
    })
})
