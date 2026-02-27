import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import HeroBanner from './HeroBanner.astro'

describe('<HeroBanner />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(HeroBanner, {
            props: {
                title: 'Test Hero Banner',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })
})
