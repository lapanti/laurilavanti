import { getByRole, queryByRole } from '@testing-library/dom'
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

        expect(getByRole(result, 'emphasis').textContent).toBe(baseProps.recommendation)
    })

    it('should render the name in a cite element', async () => {
        const result = await renderAstroComponent(Recommendation, { props: baseProps })

        expect(getByRole(result, 'contentinfo')?.textContent).toContain(baseProps.name)
    })

    it('should render the title on a separate row', async () => {
        const result = await renderAstroComponent(Recommendation, { props: baseProps })

        expect(getByRole(result, 'contentinfo').textContent).toContain(baseProps.title)
    })

    it('should render the portrait image with correct alt', async () => {
        const result = await renderAstroComponent(Recommendation, { props: baseProps })

        const img = getByRole(result, 'img', { name: baseProps.alt })
        expect(img).not.toBeNull()
        expect(img?.getAttribute('alt')).toBe(baseProps.alt)
    })

    it('should not render an img element when image is empty', async () => {
        const result = await renderAstroComponent(Recommendation, {
            props: { ...baseProps, image: '' },
        })

        expect(queryByRole(result, 'img')).toBeNull()
    })
})
