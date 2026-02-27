import { queryByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import ImageWithCaption from './ImageWithCaption.astro'

describe('<ImageWithCaption />', () => {
    it('should render nothing when no local image provided', async () => {
        const result = await renderAstroComponent(ImageWithCaption, {
            props: {
                caption: 'Test Caption',
            },
        })

        const figure = queryByRole(result, 'figure')
        expect(figure).toBeNull()
    })
})
