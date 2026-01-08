import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import HeroBanner from './HeroBanner.astro'

describe('<HeroBanner />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(HeroBanner, {
            props: {
                backgroundImage: {
                    fields: {
                        description: 'Background image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
                image: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
                title: 'Test Hero Banner',
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })
})
