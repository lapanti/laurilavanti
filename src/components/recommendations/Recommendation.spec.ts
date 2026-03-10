import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Recommendation from './Recommendation.astro'

const baseProps = {
    alt: 'Photo of Test Person. Wearing a white shirt.',
    image: 'test-person',
    name: 'Test Person',
    recommendation: 'This is a test recommendation.',
    title: 'CEO',
}

describe('<Recommendation />', () => {
    it('should render recommendation text', async () => {
        const result = await renderAstroComponent(Recommendation, { props: baseProps })

        expect(result.querySelector('blockquote p')?.textContent).toBe(baseProps.recommendation)
    })

    it('should render the name in a cite element', async () => {
        const result = await renderAstroComponent(Recommendation, { props: baseProps })

        expect(result.querySelector('blockquote footer cite')?.textContent).toBe(baseProps.name)
    })

    it('should render the title on a separate row', async () => {
        const result = await renderAstroComponent(Recommendation, { props: baseProps })

        expect(result.querySelector('blockquote footer span')?.textContent).toBe(baseProps.title)
    })

    it('should render the portrait image with correct alt', async () => {
        const result = await renderAstroComponent(Recommendation, { props: baseProps })

        const img = result.querySelector('img')
        expect(img).not.toBeNull()
        expect(img?.getAttribute('alt')).toBe(baseProps.alt)
    })

    it('should not render an img element when image is empty', async () => {
        const result = await renderAstroComponent(Recommendation, {
            props: { ...baseProps, image: '' },
        })

        expect(result.querySelector('.portrait')).toBeNull()
    })
})
