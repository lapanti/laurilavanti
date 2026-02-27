import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import BackgroundImage from './BackgroundImage.astro'

describe('<BackgroundImage />', () => {
    it('should render nothing when no image provided', async () => {
        const result = await renderAstroComponent(BackgroundImage, {
            props: {},
        })

        expect(result.firstChild).toBeNull()
    })
})
