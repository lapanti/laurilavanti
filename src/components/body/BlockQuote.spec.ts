import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../test/helpers'
import BlockQuote from './BlockQuote.astro'

describe('<BlockQuote />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(BlockQuote, {
            slots: { default: 'Quote text' },
        })

        expect(result).toMatchInlineSnapshot(`
          <div>
            <blockquote
              data-astro-cid-rvc2gyq6=""
              data-astro-source-file="/home/lapanti/code/laurilavanti/src/components/body/BlockQuote.astro"
              data-astro-source-loc="30:13"
              style="--blockQuoteFontFamily: &#34;IBM Plex Mono&#34;, Lucida Sans Typewriter;--blockQuoteFontSize: 1.5rem;--blockQuoteFontStyle: italic;--blockQuoteFontWeight: 400;--blockQuoteLineHeight: 2rem;--colorsSand: rgb(214, 210, 196);--sizes05: 0.5rem;"
            >
               Quote text 
            </blockquote>
          </div>
        `)
    })

    it('should render the element', async () => {
        const result = await renderAstroComponent(BlockQuote, {
            slots: { default: 'Test quote' },
        })

        const blockquote = getByRole(result, 'blockquote')
        expect(blockquote).toBeDefined()
    })

    it('should render slot content', async () => {
        const result = await renderAstroComponent(BlockQuote, {
            slots: { default: 'My quoted text' },
        })

        const blockquote = getByRole(result, 'blockquote')
        expect(blockquote).toHaveTextContent('My quoted text')
    })
})
