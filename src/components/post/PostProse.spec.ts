import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import PostProse from './PostProse.astro'

describe('<PostProse />', () => {
    it('renders slotted paragraphs as direct prose children', async () => {
        const result = await renderAstroComponent(PostProse, {
            slots: { default: '<p>Lead paragraph</p><p>Body paragraph</p>' },
        })

        const paragraphs = result.querySelectorAll('.prose > p')

        expect(paragraphs).toHaveLength(2)
        expect(paragraphs[0]?.textContent).toBe('Lead paragraph')
    })
})
