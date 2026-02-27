import { queryByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Images from './Images.astro'

describe('<Images />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Images, {
            props: {},
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render no image when no local images provided', async () => {
        const result = await renderAstroComponent(Images, {
            props: {},
        })

        expect(queryByRole(result, 'img')).toBeNull()
    })
})
