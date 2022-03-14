import { render, screen } from '@testing-library/react'
import React from 'react'

import { mainImage } from '../../../tests/images.mock'
import Excerpt from './Excerpt'

describe('<Excerpt />', () => {
    it('should render', () => {
        const title = 'Terveys kuuluu kaikille'
        const date = '19.01.2022'
        const excerpt =
            'Poistamalla sosiaali- ja terveydenhuollon asiakasmaksut, säästämme byrokratiassa. Lisäksi pääsemme hoitamaan ongelmia ennen kuin niistä tulee merkittäviä. Ja tärkeimpänä varmistamme, ettei kukaan jää ilman hoitoa taloudellisista syistä.'
        const tags = ['aluevaalit', 'soteuudistus', 'kirkkonummi']
        const readingTime = 65700
        const slug = 'blogi/2021/12/20/sote-on-hyvinvointiyhteiskunnan-kulmakivi'

        const { container } = render(
            <Excerpt
                title={title}
                date={date}
                excerpt={excerpt}
                tags={tags}
                readingTime={readingTime}
                slug={slug}
                image={mainImage}
            />
        )

        const article = screen.getByRole('article', { name: title })
        expect(article).toHaveAttribute('itemScope', '')
        expect(article).toHaveAttribute('itemType', 'https://schema.org/CreativeWork')

        expect(screen.getByRole('heading', { name: title })).toHaveAttribute('itemProp', 'headline')

        const mainLink = screen.getByRole('link', { name: new RegExp(title, 'i') })
        expect(mainLink).toHaveAttribute('href', `/${slug}`)
        expect(mainLink).toHaveAttribute('rel', 'permalink')

        tags.forEach((tag) => {
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        })

        expect(screen.getByText(date)).toBeInTheDocument()
        expect(screen.getByText('noin 1 minuutti')).toBeInTheDocument()
        expect(screen.getByText(excerpt)).toHaveAttribute('itemProp', 'description')

        expect(container.firstChild).toMatchInlineSnapshot(`
            <article
              aria-label="Terveys kuuluu kaikille"
              class="css-0"
              itemscope=""
              itemtype="https://schema.org/CreativeWork"
            >
              <a
                class="css-1oxnj2p"
                href="/blogi/2021/12/20/sote-on-hyvinvointiyhteiskunnan-kulmakivi"
                rel="permalink"
              >
                <div
                  class="gatsby-image-wrapper gatsby-image-wrapper-constrained css-1qwjt9"
                  data-gatsby-image-wrapper=""
                  style="position: relative; overflow: hidden; display: inline-block; vertical-align: top;"
                >
                  <div
                    style="max-width: 4032px; display: block;"
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      role="presentation"
                      src="data:image/svg+xml;charset=utf-8,%3Csvg height='1728' width='4032' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
                      style="max-width: 100%; display: block; position: static;"
                    />
                  </div>
                  <img
                    alt=""
                    aria-hidden="true"
                    data-placeholder-image=""
                    decoding="async"
                    src="data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABAABBf/EABYBAQEBAAAAAAAAAAAAAAAAAAIBA//aAAwDAQACEAMQAAABM46RedZZj//EABkQAAIDAQAAAAAAAAAAAAAAAAADAQISM//aAAgBAQABBQKFl15oQN4H/8QAFREBAQAAAAAAAAAAAAAAAAAAARD/2gAIAQMBAT8BZ//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAEQABExQXH/2gAIAQEABj8CzAb0xxf/xAAaEAACAgMAAAAAAAAAAAAAAAABEQAhIDFB/9oACAEBAAE/IW3JVgqyh33A3//aAAwDAQACAAMAAAAQh/8A/8QAFhEAAwAAAAAAAAAAAAAAAAAAARAh/9oACAEDAQE/EAi//8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERMf/aAAgBAgEBPxDU6U//xAAcEAACAgMBAQAAAAAAAAAAAAAAASExEVFxoWH/2gAIAQEAAT8QejpVrEmgti/vojbOGZhlXxHiGuH/2Q=="
                    style="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  />
                  <picture>
                    <source
                      data-srcset="/static/7297f3f75d4229c3368972931c844ed9/e020a/lauri-lavanti.webp 1008w,/static/7297f3f75d4229c3368972931c844ed9/8e702/lauri-lavanti.webp 2016w,/static/7297f3f75d4229c3368972931c844ed9/8dca9/lauri-lavanti.webp 4032w"
                      sizes="(min-width: 4032px) 4032px, 100vw"
                      type="image/webp"
                    />
                    <img
                      alt="Terveys kuuluu kaikille"
                      data-gatsby-image-ssr=""
                      data-main-image=""
                      data-src="/static/7297f3f75d4229c3368972931c844ed9/a2a15/lauri-lavanti.jpg"
                      data-srcset="/static/7297f3f75d4229c3368972931c844ed9/458de/lauri-lavanti.jpg 1008w,/static/7297f3f75d4229c3368972931c844ed9/16a08/lauri-lavanti.jpg 2016w,/static/7297f3f75d4229c3368972931c844ed9/a2a15/lauri-lavanti.jpg 4032w"
                      decoding="async"
                      loading="lazy"
                      sizes="(min-width: 4032px) 4032px, 100vw"
                      style="height: 100%; left: 0px; position: absolute; top: 0px; transform: translateZ(0); transition: opacity 250ms linear; width: 100%; will-change: opacity; opacity: 0;"
                    />
                  </picture>
                  <noscript />
                  <script
                    type="module"
                  >
                    const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1)}}
                  </script>
                </div>
                <h2
                  class="css-178znh2"
                  itemprop="headline"
                >
                  Terveys kuuluu kaikille
                </h2>
              </a>
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
                      datetime="2022-01-19"
                    >
                      19.01.2022
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
                      noin 1 minuutti
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
                      href="/blogi/soteuudistus"
                    >
                      #
                      soteuudistus
                    </a>
                  </li>
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
                </ul>
              </aside>
              <p
                class="css-1mbj6hi"
                itemprop="description"
              >
                Poistamalla sosiaali- ja terveydenhuollon asiakasmaksut, säästämme byrokratiassa. Lisäksi pääsemme hoitamaan ongelmia ennen kuin niistä tulee merkittäviä. Ja tärkeimpänä varmistamme, ettei kukaan jää ilman hoitoa taloudellisista syistä.
              </p>
            </article>
        `)
    })
})
