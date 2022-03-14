import { render, screen } from '@testing-library/react'
import React from 'react'

import H2 from './H2'

describe('<H2 />', () => {
    it('should render', () => {
        const children = 'Ääkköset ja Lapset Leikkivät'
        const { container } = render(<H2>{children}</H2>)

        expect(screen.getByRole('heading', { name: children })).toHaveAttribute('id', 'aakkoset-ja-lapset-leikkivat')

        expect(container.firstChild).toMatchInlineSnapshot(`
            <h2
              class="css-1akyri4"
              id="aakkoset-ja-lapset-leikkivat"
            >
              Ääkköset ja Lapset Leikkivät
            </h2>
        `)
    })
})
