import { render, screen } from '@testing-library/react'
import React from 'react'

import ContactInfo from './ContactInfo'

describe('<ContactInfo />', () => {
    it('should render', () => {
        const { container } = render(<ContactInfo />)

        expect(screen.getByText('lauri.lavanti@kirkkonummi.fi')).toBeInTheDocument()

        expect(screen.getByRole('link', { name: /Facebook/i })).toHaveAttribute(
            'href',
            'https://www.facebook.com/laurilavanti'
        )

        expect(screen.getByRole('link', { name: /Twitter/i })).toHaveAttribute(
            'href',
            'https://twitter.com/laurilavanti'
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <ul
              class="css-17j0lcr"
            >
              <li
                class="css-u4p24i"
              >
                <svg
                  class="css-1rc7hph"
                >
                  <use
                    xlink:href="#icon-envelope"
                  />
                </svg>
                <span>
                  lauri.lavanti@kirkkonummi.fi
                </span>
              </li>
              <li>
                <a
                  class="css-mkqfkm"
                  href="https://www.facebook.com/laurilavanti"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    class="css-hhnjdb"
                  >
                    <use
                      xlink:href="#icon-facebook"
                    />
                  </svg>
                  <span>
                    Facebook
                  </span>
                </a>
              </li>
              <li>
                <a
                  class="css-mkqfkm"
                  href="https://twitter.com/laurilavanti"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    class="css-1k3g5xr"
                  >
                    <use
                      xlink:href="#icon-twitter"
                    />
                  </svg>
                  Twitter
                </a>
              </li>
            </ul>
        `)
    })
})
