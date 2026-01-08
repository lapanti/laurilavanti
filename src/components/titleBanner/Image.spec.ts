import { getByRole, queryByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import Image from './Image.astro'

describe('<Image />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Image, {
            props: {
                heroImage: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render no image when no url', async () => {
        const result = await renderAstroComponent(Image, {
            props: {},
        })

        expect(queryByRole(result, 'img')).toBeNull()
    })

    it('should render image', async () => {
        const result = await renderAstroComponent(Image, {
            props: {
                heroImage: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
            },
        })

        expect(getByRole(result, 'img', { name: /Test image/i })).toBeDefined()
    })

    it('should render alt for image', async () => {
        const result = await renderAstroComponent(Image, {
            props: {
                heroImage: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
            },
        })

        expect(getByRole(result, 'img', { name: /Test image/i })).toHaveAttribute('alt', 'Test image')
    })
})
