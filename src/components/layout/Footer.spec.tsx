import { render, screen } from '@testing-library/react'
import React from 'react'

import Footer from './Footer'

describe('<Footer />', () => {
    it('should render', () => {
        const { container } = render(<Footer />)

        expect(screen.getByRole('link', { name: /Facebook/i })).toHaveAttribute(
            'href',
            'https://www.facebook.com/laurilavanti/'
        )

        expect(screen.getByRole('link', { name: /Twitter/i })).toHaveAttribute(
            'href',
            'https://twitter.com/laurilavanti'
        )

        expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
            'href',
            'https://www.linkedin.com/in/lapanti/'
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <footer
              class="css-wyssy7"
            >
              <ul
                class="css-1hyoz7m"
              >
                <li
                  class="css-behyg3"
                >
                  <a
                    href="https://www.facebook.com/laurilavanti/"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Facebook"
                  >
                    <svg
                      class="css-a62265"
                    >
                      <use
                        xlink:href="#icon-facebook"
                      />
                    </svg>
                  </a>
                </li>
                <li
                  class="css-behyg3"
                >
                  <a
                    href="https://twitter.com/laurilavanti"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Twitter"
                  >
                    <svg
                      class="css-14al99q"
                    >
                      <use
                        xlink:href="#icon-twitter"
                      />
                    </svg>
                  </a>
                </li>
                <li
                  class="css-behyg3"
                >
                  <a
                    href="https://www.linkedin.com/in/lapanti/"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="LinkedIn"
                  >
                    <svg
                      class="css-be1gqa"
                    >
                      <use
                        xlink:href="#icon-linkedin"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </footer>
        `)
    })
})
