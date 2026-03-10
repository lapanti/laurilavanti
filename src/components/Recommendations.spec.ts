import type { Recommendation } from '../content/recommendations'

import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Recommendations from './Recommendations.astro'

const testRecommendations: Recommendation[] = [
    {
        image: 'person-one',
        locales: {
            en: { alt: 'Photo of Person One.', title: 'CEO' },
            fi: { alt: 'Kuva Person Onesta.', title: 'Toimitusjohtaja' },
            sv: { alt: 'Foto av Person One.', title: 'VD' },
        },
        name: 'Person One',
        recommendation: 'Finnish recommendation text.',
    },
    {
        image: 'person-two',
        locales: {
            en: { alt: 'Photo of Person Two.', title: 'Manager' },
            fi: { alt: 'Kuva Person Twosta.', title: 'Johtaja' },
            sv: { alt: 'Foto av Person Two.', title: 'Chef' },
        },
        name: 'Person Two',
        recommendation: 'Another Finnish recommendation.',
    },
]

describe('<Recommendations />', () => {
    it('should render a list item for each recommendation', async () => {
        const result = await renderAstroComponent(Recommendations, {
            props: { lang: 'fi', recommendations: testRecommendations },
        })

        const items = result.querySelectorAll('li')
        expect(items).toHaveLength(testRecommendations.length)
    })

    it('should use Finnish locale alt text when lang is fi', async () => {
        const result = await renderAstroComponent(Recommendations, {
            props: { lang: 'fi', recommendations: testRecommendations },
        })

        const images = result.querySelectorAll('img')
        expect(images[0]?.getAttribute('alt')).toBe('Kuva Person Onesta.')
    })

    it('should use English locale alt text when lang is en', async () => {
        const result = await renderAstroComponent(Recommendations, {
            props: { lang: 'en', recommendations: testRecommendations },
        })

        const images = result.querySelectorAll('img')
        expect(images[0]?.getAttribute('alt')).toBe('Photo of Person One.')
    })

    it('should use Swedish locale alt text when lang is sv', async () => {
        const result = await renderAstroComponent(Recommendations, {
            props: { lang: 'sv', recommendations: testRecommendations },
        })

        const images = result.querySelectorAll('img')
        expect(images[0]?.getAttribute('alt')).toBe('Foto av Person One.')
    })

    it('should render Finnish recommendation text regardless of locale', async () => {
        const result = await renderAstroComponent(Recommendations, {
            props: { lang: 'en', recommendations: testRecommendations },
        })

        const blockquotes = result.querySelectorAll('blockquote p')
        expect(blockquotes[0]?.textContent).toBe('Finnish recommendation text.')
    })

    it('should render empty list when recommendations array is empty', async () => {
        const result = await renderAstroComponent(Recommendations, {
            props: { lang: 'fi', recommendations: [] },
        })

        expect(result.querySelectorAll('li')).toHaveLength(0)
    })
})
