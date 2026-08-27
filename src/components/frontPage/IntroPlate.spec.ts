import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import IntroPlate from './IntroPlate.astro'

describe('<IntroPlate />', () => {
    const props = { eyebrow: 'Eyebrow', heading: 'Heading' } as const

    it('should render the video slot between the heading and the body', async () => {
        const result = await renderAstroComponent(IntroPlate, {
            props,
            slots: { default: '<p>Body</p>', video: '<div id="video">Video</div>' },
        })
        const children = Array.from(result.querySelector('.inner')?.children ?? [])

        expect(children.map((child) => child.tagName.toLowerCase())).toEqual(['span', 'h2', 'div', 'div'])
        expect(children[2]).toHaveAttribute('id', 'video')
        expect(children[3]).toHaveClass('body')
    })

    it('should render nothing extra when the video slot is unfilled', async () => {
        const result = await renderAstroComponent(IntroPlate, {
            props,
            slots: { default: '<p>Body</p>' },
        })

        expect(result.querySelector('.inner')?.children).toHaveLength(3)
    })
})
