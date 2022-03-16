import { render, screen } from '@testing-library/react'
import React from 'react'

import PostMeta from './PostMeta'

const MINUTE_IN_MS = 1000 * 60

describe('<PostMeta />', () => {
    const tags = ['kirkkonummi', 'aluevaalit', 'sote', 'kuntavaalit']
    const date = '16.3.2022'
    const dateAsDateTime = '2022-3-16'

    it('should render less than a minute', () => {
        const readingTime = MINUTE_IN_MS - 50

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText('alle minuutti')).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <aside
              class="css-j7qwjs"
            >
              <div
                class="css-96di1v"
              >
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-calendar-alt"
                    />
                  </svg>
                  <time
                    datetime="2022-3-16"
                  >
                    16.3.2022
                  </time>
                </span>
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-clock"
                    />
                  </svg>
                  <span>
                    alle minuutti
                  </span>
                </span>
              </div>
              <ul
                class="css-1xhj18k"
              >
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kirkkonummi"
                  >
                    #
                    kirkkonummi
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/aluevaalit"
                  >
                    #
                    aluevaalit
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/sote"
                  >
                    #
                    sote
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kuntavaalit"
                  >
                    #
                    kuntavaalit
                  </a>
                </li>
              </ul>
            </aside>
        `)
    })

    it('should render exactly one minute', () => {
        const readingTime = MINUTE_IN_MS

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText('1 minuutti')).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <aside
              class="css-j7qwjs"
            >
              <div
                class="css-96di1v"
              >
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-calendar-alt"
                    />
                  </svg>
                  <time
                    datetime="2022-3-16"
                  >
                    16.3.2022
                  </time>
                </span>
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-clock"
                    />
                  </svg>
                  <span>
                    1 minuutti
                  </span>
                </span>
              </div>
              <ul
                class="css-1xhj18k"
              >
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kirkkonummi"
                  >
                    #
                    kirkkonummi
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/aluevaalit"
                  >
                    #
                    aluevaalit
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/sote"
                  >
                    #
                    sote
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kuntavaalit"
                  >
                    #
                    kuntavaalit
                  </a>
                </li>
              </ul>
            </aside>
        `)
    })

    it('should render multiple minutes', () => {
        const minutes = 15
        const readingTime = MINUTE_IN_MS * minutes

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText(`${minutes} minuuttia`)).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <aside
              class="css-j7qwjs"
            >
              <div
                class="css-96di1v"
              >
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-calendar-alt"
                    />
                  </svg>
                  <time
                    datetime="2022-3-16"
                  >
                    16.3.2022
                  </time>
                </span>
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-clock"
                    />
                  </svg>
                  <span>
                    15 minuuttia
                  </span>
                </span>
              </div>
              <ul
                class="css-1xhj18k"
              >
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kirkkonummi"
                  >
                    #
                    kirkkonummi
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/aluevaalit"
                  >
                    #
                    aluevaalit
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/sote"
                  >
                    #
                    sote
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kuntavaalit"
                  >
                    #
                    kuntavaalit
                  </a>
                </li>
              </ul>
            </aside>
        `)
    })

    it('should render approximately multiple minutes', () => {
        const minutes = 15
        const readingTime = MINUTE_IN_MS * minutes + 10

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText(`noin ${minutes} minuuttia`)).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <aside
              class="css-j7qwjs"
            >
              <div
                class="css-96di1v"
              >
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-calendar-alt"
                    />
                  </svg>
                  <time
                    datetime="2022-3-16"
                  >
                    16.3.2022
                  </time>
                </span>
                <span
                  class="css-1fuc7m2"
                >
                  <svg
                    class="css-79tm4e"
                  >
                    <use
                      xlink:href="#icon-clock"
                    />
                  </svg>
                  <span>
                    noin 15 minuuttia
                  </span>
                </span>
              </div>
              <ul
                class="css-1xhj18k"
              >
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kirkkonummi"
                  >
                    #
                    kirkkonummi
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/aluevaalit"
                  >
                    #
                    aluevaalit
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/sote"
                  >
                    #
                    sote
                  </a>
                </li>
                <li
                  class="css-1rw86pq"
                >
                  <a
                    class="css-1oxnj2p"
                    href="/blogi/kuntavaalit"
                  >
                    #
                    kuntavaalit
                  </a>
                </li>
              </ul>
            </aside>
        `)
    })
})
