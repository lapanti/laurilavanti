import { render, screen } from '@testing-library/react'
import React from 'react'

import InternalLink from './InternalLink'

describe('<InternalLink />', () => {
    it('should render', () => {
        const href = '/blogi'
        const children = 'Linkki'

        const { container } = render(<InternalLink to={href}>{children}</InternalLink>)

        expect(screen.getByRole('link', { name: children })).toHaveAttribute('href', href)

        expect(container.firstChild).toMatchInlineSnapshot(`
            <a
              class="css-1oxnj2p"
              href="/blogi"
            >
              Linkki
            </a>
        `)
    })
})
