import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import BlockQuote from './BlockQuote.astro'

describe('<BlockQuote />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(BlockQuote, {
            slots: { default: 'Quote text' },
        })

        expect(result.firstChild).toMatchSnapshot()
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
