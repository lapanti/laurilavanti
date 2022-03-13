import type { ImageDataLike } from 'gatsby-plugin-image'

import { render, screen } from '@testing-library/react'
import React from 'react'

import HeroImage from './HeroImage'

describe('<HeroImage />', () => {
    const alt = 'alt'

    it('should return null if no image', () => {
        const imageData: ImageDataLike = {
            id: '',
            parent: null,
            children: [],
            internal: { type: '', contentDigest: '', owner: '' },
        }
        const { container } = render(<HeroImage alt={alt} imageData={imageData} />)

        expect(container.firstChild).toBeNull()
    })

    it('should render actual image', () => {
        const imageData: ImageDataLike = {
            id: '',
            parent: null,
            children: [],
            internal: { type: '', contentDigest: '', owner: '' },
            childImageSharp: {
                id: '',
                parent: null,
                children: [],
                internal: { type: '', contentDigest: '', owner: '' },
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABAABBf/EABYBAQEBAAAAAAAAAAAAAAAAAAIBA//aAAwDAQACEAMQAAABM46RedZZj//EABkQAAIDAQAAAAAAAAAAAAAAAAADAQISM//aAAgBAQABBQKFl15oQN4H/8QAFREBAQAAAAAAAAAAAAAAAAAAARD/2gAIAQMBAT8BZ//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAEQABExQXH/2gAIAQEABj8CzAb0xxf/xAAaEAACAgMAAAAAAAAAAAAAAAABEQAhIDFB/9oACAEBAAE/IW3JVgqyh33A3//aAAwDAQACAAMAAAAQh/8A/8QAFhEAAwAAAAAAAAAAAAAAAAAAARAh/9oACAEDAQE/EAi//8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERMf/aAAgBAgEBPxDU6U//xAAcEAACAgMBAQAAAAAAAAAAAAAAASExEVFxoWH/2gAIAQEAAT8QejpVrEmgti/vojbOGZhlXxHiGuH/2Q==',
                    },
                    images: {
                        fallback: {
                            src: '/static/7297f3f75d4229c3368972931c844ed9/a2a15/lauri-lavanti.jpg',
                            srcSet: '/static/7297f3f75d4229c3368972931c844ed9/458de/lauri-lavanti.jpg 1008w,\n/static/7297f3f75d4229c3368972931c844ed9/16a08/lauri-lavanti.jpg 2016w,\n/static/7297f3f75d4229c3368972931c844ed9/a2a15/lauri-lavanti.jpg 4032w',
                            sizes: '(min-width: 4032px) 4032px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/7297f3f75d4229c3368972931c844ed9/e020a/lauri-lavanti.webp 1008w,\n/static/7297f3f75d4229c3368972931c844ed9/8e702/lauri-lavanti.webp 2016w,\n/static/7297f3f75d4229c3368972931c844ed9/8dca9/lauri-lavanti.webp 4032w',
                                type: 'image/webp',
                                sizes: '(min-width: 4032px) 4032px, 100vw',
                            },
                        ],
                    },
                    width: 4032,
                    height: 1728,
                },
            },
        }
        const { container } = render(<HeroImage alt={alt} imageData={imageData} />)

        expect(screen.getByRole('img', { name: alt })).toBeInTheDocument()

        expect(container.firstChild).toMatchInlineSnapshot(`
            <div
              class="css-bbmnyn"
            >
              <div
                class="gatsby-image-wrapper gatsby-image-wrapper-constrained css-4gdwhm"
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
                    alt="alt"
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
            </div>
        `)
    })
})
