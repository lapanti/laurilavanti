import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import Description from './Description.astro'

describe('<Description />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'Test excerpt',
                slug: 'test-slug',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render excerpt text', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'My test excerpt',
                slug: 'test-slug',
            },
        })

        expect(result).toHaveTextContent('My test excerpt')
    })

    it('should render with itemProp description attribute', async () => {
        const result = await renderAstroComponent(Description, {
            props: {
                excerpt: 'Test excerpt',
                slug: 'test-slug',
            },
        })

        expect(result.firstChild).toHaveAttribute('itemProp', 'description')
    })
})
