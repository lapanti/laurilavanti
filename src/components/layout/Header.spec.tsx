import { render, screen } from '@testing-library/react'
import React from 'react'

import Header from './Header'

describe('<Header />', () => {
    it('should render', () => {
        const { container } = render(<Header />)

        expect(screen.getByRole('link', { name: /Lauri Lavanti/i })).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', { name: /Minusta/i })).toHaveAttribute('href', '/minusta')
        expect(screen.getByRole('link', { name: /Blogi/i })).toHaveAttribute('href', '/blogi')
        expect(screen.getByRole('link', { name: /Ota yhteyttä/i })).toHaveAttribute('href', '/ota-yhteytta')

        expect(container.firstChild).toMatchInlineSnapshot(`
            <header
              class="css-3knrel"
            >
              <nav
                class="css-1o2ndit"
              >
                <a
                  aria-label="Lauri Lavanti"
                  class="css-pc3p7f"
                  href="/"
                >
                  <svg
                    class="css-w0k9t"
                  >
                    <use
                      xlink:href="#logo"
                    />
                  </svg>
                  <span
                    class="css-1sgvto8"
                  >
                    Lauri Lavanti
                  </span>
                </a>
                <ul
                  class="css-voneje"
                >
                  <li
                    class="css-bn8vgc"
                  >
                    <a
                      class="css-hbc5qy"
                      href="/minusta"
                    >
                      Minusta
                    </a>
                  </li>
                  <li
                    class="css-bn8vgc"
                  >
                    <a
                      class="css-hbc5qy"
                      href="/blogi"
                    >
                      Blogi
                    </a>
                  </li>
                  <li
                    class="css-bn8vgc"
                  >
                    <a
                      class="css-hbc5qy"
                      href="/ota-yhteytta"
                    >
                      Ota yhteyttä
                    </a>
                  </li>
                </ul>
              </nav>
            </header>
        `)
    })
})
