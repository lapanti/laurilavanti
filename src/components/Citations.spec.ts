import type { Citation } from '../content/citations'

import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Citations from './Citations.astro'

const testCitations: Citation[] = [
    {
        citation: 'Finnish citation text.',
        image: 'person-one',
        locales: {
            en: { alt: 'Photo of Person One.', title: 'CEO' },
            fi: { alt: 'Kuva Person Onesta.', title: 'Toimitusjohtaja' },
            sv: { alt: 'Foto av Person One.', title: 'VD' },
        },
        name: 'Person One',
    },
    {
        citation: 'Another Finnish citation.',
        image: 'person-two',
        locales: {
            en: { alt: 'Photo of Person Two.', title: 'Manager' },
            fi: { alt: 'Kuva Person Twosta.', title: 'Johtaja' },
            sv: { alt: 'Foto av Person Two.', title: 'Chef' },
        },
        name: 'Person Two',
    },
]

describe('<Citations />', () => {
    it('should render a list item for each citation', async () => {
        const result = await renderAstroComponent(Citations, {
            props: { citations: testCitations, lang: 'fi' },
        })

        const items = result.querySelectorAll('li')
        expect(items).toHaveLength(testCitations.length)
    })

    it('should use Finnish locale alt text when lang is fi', async () => {
        const result = await renderAstroComponent(Citations, {
            props: { citations: testCitations, lang: 'fi' },
        })

        const images = result.querySelectorAll('img')
        expect(images[0]?.getAttribute('alt')).toBe('Kuva Person Onesta.')
    })

    it('should use English locale alt text when lang is en', async () => {
        const result = await renderAstroComponent(Citations, {
            props: { citations: testCitations, lang: 'en' },
        })

        const images = result.querySelectorAll('img')
        expect(images[0]?.getAttribute('alt')).toBe('Photo of Person One.')
    })

    it('should use Swedish locale alt text when lang is sv', async () => {
        const result = await renderAstroComponent(Citations, {
            props: { citations: testCitations, lang: 'sv' },
        })

        const images = result.querySelectorAll('img')
        expect(images[0]?.getAttribute('alt')).toBe('Foto av Person One.')
    })

    it('should render Finnish citation text regardless of locale', async () => {
        const result = await renderAstroComponent(Citations, {
            props: { citations: testCitations, lang: 'en' },
        })

        const blockquotes = result.querySelectorAll('blockquote p')
        expect(blockquotes[0]?.textContent).toBe('Finnish citation text.')
    })

    it('should render empty list when citations array is empty', async () => {
        const result = await renderAstroComponent(Citations, {
            props: { citations: [], lang: 'fi' },
        })

        expect(result.querySelectorAll('li')).toHaveLength(0)
    })
})
