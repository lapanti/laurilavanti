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
                heroImage: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
                tags: [{ sys: { id: 'tag-1', linkType: 'Tag', type: 'Link' } }],
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })
})
