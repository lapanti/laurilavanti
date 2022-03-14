import { render, screen } from '@testing-library/react'
import React from 'react'

import HomeTitle from './HomeTitle'

describe('<HomeTitle />', () => {
    it('should render', () => {
        const { container } = render(<HomeTitle />)

        expect(screen.getByRole('term', { name: /Lauri Lavanti/i })).toBeInTheDocument()

        expect(screen.getByRole('definition', { name: /Isä/i })).toBeInTheDocument()
        expect(screen.getByRole('definition', { name: /Kirkkonummelainen/i })).toBeInTheDocument()
        expect(screen.getByRole('definition', { name: /Ohjelmistokehittäjä/i })).toBeInTheDocument()
        expect(screen.getByRole('definition', { name: /Diplomi-insinööri/i })).toBeInTheDocument()

        expect(container.firstChild).toMatchInlineSnapshot(`
            <h1
              class="css-j0buno"
            >
              <dl
                class="css-nqsfib"
              >
                <dt
                  aria-label="Lauri Lavanti"
                  class="css-1bf7e4w"
                >
                  Lauri Lavanti
                </dt>
                <dd
                  aria-label="Isä"
                >
                  Isä
                </dd>
                <dd
                  aria-label="Kirkkonummelainen"
                >
                  Kirkkonummelainen
                </dd>
                <dd
                  aria-label="Ohjelmistokehittäjä"
                >
                  Ohjelmistokehittäjä
                </dd>
                <dd
                  aria-label="Diplomi-insinööri"
                >
                  Diplomi-insinööri
                </dd>
              </dl>
            </h1>
        `)
    })
})
