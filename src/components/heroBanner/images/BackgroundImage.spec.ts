import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../tests/helpers'
import BackgroundImage from './BackgroundImage.astro'

describe('<BackgroundImage />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(BackgroundImage, {
            props: {
                image: {
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

    it('should render nothing when no url', async () => {
        const result = await renderAstroComponent(BackgroundImage, {
            props: {},
        })

        expect(result.firstChild).toBeNull()
    })

    it('should render image', async () => {
        const result = await renderAstroComponent(BackgroundImage, {
            props: {
                image: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
            },
        })

        expect(getByRole(result, 'presentation')).toBeDefined()
    })

    it('should render no alt for image', async () => {
        const result = await renderAstroComponent(BackgroundImage, {
            props: {
                image: {
                    fields: {
                        description: 'Test image',
                        file: {
                            url: '//images.ctfassets.net/44t6u1r4zgqq/22zkTYrMQVwAfvrEW3WGeX/9d5c7c3e5e853a9dede1b5cc0e539486/TekoÃ_ly.jpg',
                        },
                    },
                },
            },
        })

        expect(getByRole(result, 'presentation')).toHaveAttribute('alt', '')
    })
})
