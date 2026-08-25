import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import TopicPlate from './TopicPlate.astro'

const allPostsHref = '/fi/category/artificial-intelligence/'
const allPostsLabel = 'Kaikki kirjoitukset aiheesta Tekoäly'
const heading = 'Tekoäly'
const id = 'tekoaly'
const intro = ['Tekoäly on aikamme merkittävin teknologinen murros.', 'Suomen on tartuttava siihen aktiivisesti.']
const postGrid = '<ul class="post-grid"><li>Post card</li></ul>'

const renderTopicPlate = (ground: 'sand' | 'offWhite' = 'sand') =>
    renderAstroComponent(TopicPlate, {
        props: {
            allPostsHref,
            allPostsLabel,
            ground,
            heading,
            id,
            intro,
        },
        slots: {
            default: postGrid,
        },
    })

describe('<TopicPlate />', () => {
    it('should render', async () => {
        const result = await renderTopicPlate()

        expect(result.firstChild).toMatchInlineSnapshot(`
          <section
            aria-labelledby="tekoaly-h"
            class="topic topic--sand"
            data-astro-cid-y3cfq6fe=""
            id="tekoaly"
            style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
          >
             
            <div
              class="sheet"
              data-astro-cid-y3cfq6fe=""
              style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
            >
               
              <div
                class="inner"
                data-astro-cid-y3cfq6fe=""
                style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
              >
                 
                <div
                  class="topic-head"
                  data-astro-cid-y3cfq6fe=""
                  style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                >
                   
                  <h2
                    class="topic-h"
                    data-astro-cid-y3cfq6fe=""
                    id="tekoaly-h"
                    style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                  >
                    Tekoäly
                  </h2>
                   
                  <div
                    class="topic-intro"
                    data-astro-cid-y3cfq6fe=""
                    style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                  >
                     
                    <p
                      class="answer"
                      data-astro-cid-y3cfq6fe=""
                      style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                    >
                      Tekoäly on aikamme merkittävin teknologinen murros.
                    </p>
                    <p
                      data-astro-cid-y3cfq6fe=""
                      style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                    >
                      Suomen on tartuttava siihen aktiivisesti.
                    </p>
                     
                  </div>
                   
                </div>
                 
                <div
                  class="topic-body"
                  data-astro-cid-y3cfq6fe=""
                  style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                >
                   
                  <ul
                    class="post-grid"
                  >
                    <li>
                      Post card
                    </li>
                  </ul>
                   
                </div>
                 
                <p
                  class="topic-more"
                  data-astro-cid-y3cfq6fe=""
                  style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                >
                  <a
                    class="link-rule"
                    data-astro-cid-y3cfq6fe=""
                    href="/fi/category/artificial-intelligence/"
                    style="--topicPlateAnswerFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateDisplayFontFamily: "Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif;--topicPlateForestGreen: rgb(22, 62, 53);--topicPlateGround: #E9E4D4;--topicPlateTextFontFamily: "IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif;--topicPlateTextPrimary: #1B211C;"
                  >
                    Kaikki kirjoitukset aiheesta Tekoäly
                  </a>
                </p>
                 
              </div>
               
            </div>
             
          </section>
        `)
    })

    it('wires the topic anchor to its heading', async () => {
        const result = await renderTopicPlate()
        const section = result.querySelector('section')

        expect(section).toHaveAttribute('aria-labelledby', `${id}-h`)
        expect(section).toHaveAttribute('id', id)
        expect(getByRole(result, 'heading', { name: heading })).toHaveAttribute('id', `${id}-h`)
    })

    it('renders the selected ground and introductory paragraphs', async () => {
        const offWhiteResult = await renderTopicPlate('offWhite')
        const sandResult = await renderTopicPlate()

        expect(offWhiteResult.querySelector('section')).toHaveClass('topic--off')
        expect(sandResult.querySelector('section')).toHaveClass('topic--sand')
        expect(sandResult.querySelector('.topic-intro .answer')).toHaveTextContent(intro[0])
        expect(getByText(sandResult, intro[1])).toBeDefined()
    })

    it('renders the supplied posts and all-posts link', async () => {
        const result = await renderTopicPlate()
        const allPostsLink = getByRole(result, 'link', { name: allPostsLabel })

        expect(allPostsLink).toHaveAttribute('href', allPostsHref)
        expect(getByText(result, 'Post card')).toBeDefined()
    })
})
