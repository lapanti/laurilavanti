import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Citation from './Citation.astro'

const baseProps = {
    alt: 'Photo of Test Person. Wearing a white shirt.',
    citation: 'This is a test citation.',
    image: 'test-person',
    name: 'Test Person',
    title: 'CEO',
}

describe('<Citation />', () => {
    it('should render citation text', async () => {
        const result = await renderAstroComponent(Citation, { props: baseProps })

        expect(result.querySelector('blockquote p')?.textContent).toBe(baseProps.citation)
    })

    it('should render the name', async () => {
        const result = await renderAstroComponent(Citation, { props: baseProps })

        expect(result.querySelector('blockquote footer')?.textContent).toContain(baseProps.name)
    })

    it('should render the title', async () => {
        const result = await renderAstroComponent(Citation, { props: baseProps })

        expect(result.querySelector('blockquote footer span')?.textContent).toBe(baseProps.title)
    })

    it('should render the portrait image with correct alt', async () => {
        const result = await renderAstroComponent(Citation, { props: baseProps })

        const img = result.querySelector('img')
        expect(img).not.toBeNull()
        expect(img?.getAttribute('alt')).toBe(baseProps.alt)
    })

    it('should not render an img element when image is empty', async () => {
        const result = await renderAstroComponent(Citation, {
            props: { ...baseProps, image: '' },
        })

        expect(result.querySelector('.portrait')).toBeNull()
    })
})
