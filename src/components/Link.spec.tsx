import { render, screen } from '@testing-library/react'
import React from 'react'

import Link from './Link'

describe('<Link />', () => {
    it('should render', () => {
        const href = 'https://laurilavanti.fi'
        const children = 'Linkki'

        const { container } = render(<Link href={href}>{children}</Link>)

        expect(screen.getByRole('link', { name: children })).toHaveAttribute('href', href)

        expect(container.firstChild).toMatchSnapshot()
    })
})
