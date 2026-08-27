import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import HeroBanner from './HeroBanner.astro'

describe('<HeroBanner />', () => {
    const slogan = {
        candidacy: ['Candidacy line'],
        prefix: 'Because technology should serve',
        restingWord: 'four',
    }

    it('should render', async () => {
        const result = await renderAstroComponent(HeroBanner, {
            props: {
                description: 'Description sentence.',
                lang: 'en',
                slogan,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the headline built from the slogan', async () => {
        const result = await renderAstroComponent(HeroBanner, {
            props: {
                description: 'Description sentence.',
                lang: 'en',
                slogan,
            },
        })

        expect(getByRole(result, 'heading', { level: 1, name: `${slogan.prefix} four` })).toBeDefined()
    })
})
