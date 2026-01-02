import { experimental_AstroContainer as AstroContainer } from 'astro/container' // eslint-disable-line import/no-unresolved
import { describe, expect, it } from 'vitest'

import Hr from './Hr.astro'

describe('<Hr />', () => {
    it('should render', async () => {
        const container = await AstroContainer.create()
        const result = await container.renderToString(Hr, {})

        expect(result).toMatchInlineSnapshot(
            `"<hr data-astro-cid-ynkeys4z style="--sizes1: 1rem;" data-astro-source-file="/home/lapanti/code/laurilavanti/src/components/body/Hr.astro" data-astro-source-loc="11:2">"`
        )
    })
})
