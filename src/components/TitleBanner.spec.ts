import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import TitleBanner from './TitleBanner.astro'

describe('<TitleBanner />', () => {
    const title = 'Test Title'
    const createdAt = '2026-01-01T00:00:00Z'

    it('should render', async () => {
        const result = await renderAstroComponent(TitleBanner, {
            props: {
                allTags: { items: [{ name: 'Tekoäly', sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }] },
                createdAt,
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })
})
