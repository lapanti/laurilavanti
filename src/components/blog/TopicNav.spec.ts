import { getAllByRole, getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import TopicNav from './TopicNav.astro'

const ariaLabel = 'Kirjoitusten aiheet'
const items = [
    { href: '#tekoaly', label: 'Tekoäly' },
    { href: '#talous', label: 'Talous' },
]

const renderTopicNav = () => renderAstroComponent(TopicNav, { props: { ariaLabel, items } })

describe('<TopicNav />', () => {
    it('should render', async () => {
        const result = await renderTopicNav()

        expect(result.firstChild).toMatchInlineSnapshot(`
          <nav
            aria-label="Kirjoitusten aiheet"
            class="topicnav"
            data-astro-cid-6odiugvn=""
            style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
          >
             
            <div
              class="sheet"
              data-astro-cid-6odiugvn=""
              style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
            >
               
              <div
                class="inner"
                data-astro-cid-6odiugvn=""
                style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
              >
                 
                <ul
                  data-astro-cid-6odiugvn=""
                  style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
                >
                   
                  <li
                    data-astro-cid-6odiugvn=""
                    style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
                  >
                     
                    <a
                      aria-current="false"
                      data-astro-cid-6odiugvn=""
                      href="#tekoaly"
                      style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
                    >
                       Tekoäly 
                    </a>
                     
                  </li>
                  <li
                    data-astro-cid-6odiugvn=""
                    style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
                  >
                     
                    <a
                      aria-current="false"
                      data-astro-cid-6odiugvn=""
                      href="#talous"
                      style="--topicNavAquaBlue: #BFE1DE;--topicNavBrightGreen: #009639;--topicNavDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicNavForestGreen: rgb(22, 62, 53);--topicNavOat: #E4D77E;--topicNavTransparent: transparent;"
                    >
                       Talous 
                    </a>
                     
                  </li>
                   
                </ul>
                 
              </div>
               
            </div>
             
          </nav>
        `)
    })

    it('renders the localised navigation label', async () => {
        const result = await renderTopicNav()

        expect(getByRole(result, 'navigation', { name: ariaLabel })).toBeDefined()
    })

    it('renders each item as an in-page anchor', async () => {
        const result = await renderTopicNav()
        const links = getAllByRole(result, 'link')

        expect(links.map((link) => ({ href: link.getAttribute('href'), label: link.textContent?.trim() }))).toEqual(
            items
        )
    })

    it('marks no item as current when currentId is omitted', async () => {
        const result = await renderTopicNav()

        expect(getAllByRole(result, 'link').map((link) => link.getAttribute('aria-current'))).toEqual([
            'false',
            'false',
        ])
    })

    it('marks the matching item as current when currentId is given', async () => {
        const result = await renderAstroComponent(TopicNav, { props: { ariaLabel, currentId: 'talous', items } })

        expect(getAllByRole(result, 'link').map((link) => link.getAttribute('aria-current'))).toEqual(['false', 'true'])
    })
})
