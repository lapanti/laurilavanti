import { describe, expect, it } from 'vitest'

import {
    colors,
    CONTENT_PADDING,
    CONTENT_SIZE,
    fontFamilies,
    fontSizes,
    fontWeights,
    HEADER_SIZE,
    sizes,
    typographics,
    zIndices,
} from './styles'

describe('styles', () => {
    describe('sizes', () => {
        it('should stay the same', () => {
            expect(sizes).toEqual({
                [0]: '0px',
                [0.5]: '0.5rem',
                [0.25]: '0.25rem',
                [0.125]: '0.125rem',
                [0.875]: '0.875rem',
                [0.1875]: '0.1875rem',
                [1]: '1rem',
                [1.5]: '1.5rem',
                [1.25]: '1.25rem',
                [1.75]: '1.75rem',
                [1.125]: '1.125rem',
                [1.875]: '1.875rem',
                [2]: '2rem',
                [2.5]: '2.5rem',
                [2.25]: '2.25rem',
                [3]: '3rem',
                [3.5]: '3.5rem',
                [3.75]: '3.75rem',
                [4]: '4rem',
                [4.5]: '4.5rem',
                [5]: '5rem',
                [6]: '6rem',
                [7]: '7rem',
                [8]: '8rem',
                [9]: '9rem',
                [14]: '14rem',
                [24]: '24rem',
                [35]: '35rem',
                [37.5]: '37.5rem',
                [45]: '45rem',
                [75]: '75rem',
            })
        })
    })

    describe('zIndices', () => {
        it('should stay the same', () => {
            expect(zIndices).toEqual({ [50]: 50 })
        })
    })

    describe('hEADER_SIZE', () => {
        it('should stay the same', () => {
            expect(HEADER_SIZE).toEqual(sizes[3.75])
        })
    })

    describe('cONTENT_SIZE', () => {
        it('should stay the same', () => {
            expect(CONTENT_SIZE).toEqual(sizes[75])
        })
    })

    describe('cONTENT_PADDING', () => {
        it('should stay the same', () => {
            expect(CONTENT_PADDING).toEqual(sizes[0.5])
        })
    })

    describe('colors', () => {
        it('should stay the same', () => {
            expect(colors).toEqual({
                black: 'rgb(0, 0, 0)',
                bluesky: '#0060df',
                darkGreenText: 'rgb(0, 104, 69)',
                evening: 'rgb(0, 98, 114)',
                evening70: 'rgba(0, 98, 114, 0.7)',
                facebook: '#4267B2',
                gray: 'rgb(235, 235, 236)',
                instagramGradient: 'url(#instagram-gradient)',
                linkedin: '#0E76A8',
                mastodon: '#6363ff',
                moss: 'rgb(90, 94, 0)',
                peach: 'rgb(248, 207, 169)',
                regionalPurple: '#865C97',
                sand: 'rgb(214, 210, 196)',
                threads: 'rgb(0, 0, 0)',
                transparent: 'transparent',
                white: 'rgb(255, 255, 255)',
            })
        })
    })

    describe('fontSizes', () => {
        it('should stay the same', () => {
            expect(fontSizes).toEqual({
                [1]: { fontSize: '1rem', lineHeight: '1.5rem' },
                [1.5]: { fontSize: sizes[1.5], lineHeight: '2rem' },
                [1.25]: { fontSize: sizes[1.25], lineHeight: '1.75rem' },
                [1.75]: { fontSize: sizes[1.75], lineHeight: '2.25rem' },
                [1.125]: { fontSize: sizes[1.125], lineHeight: '1.75rem' },
                [1.875]: { fontSize: sizes[1.875], lineHeight: '2.25rem' },
                [2.25]: { fontSize: sizes[2.25], lineHeight: '2.5rem' },
                [3]: { fontSize: sizes[3], lineHeight: '1' },
                [3.75]: { fontSize: sizes[3.75], lineHeight: '1' },
                [5]: { fontSize: sizes[5], lineHeight: '1' },
                [6]: { fontSize: sizes[6], lineHeight: '1' },
            })
        })
    })

    describe('fontFamilies', () => {
        it('should stay the same', () => {
            expect(fontFamilies).toEqual({
                heading: `"Krana Fat", Trebuchet MS`,
                mono: `"IBM Plex Mono", Lucida Sans Typewriter`,
                sans: `"IBM Plex Sans", Trebuchet MS`,
            })
        })
    })

    describe('fontWeights', () => {
        it('should stay the same', () => {
            expect(fontWeights).toEqual({
                black: 1000,
                light: 300,
                medium: 500,
                regular: 400,
            })
        })
    })

    describe('typographics', () => {
        it('should stay the same', () => {
            expect(typographics).toEqual({
                additionalInfo: { ...fontSizes[1], fontFamily: fontFamilies.mono, fontWeight: fontWeights.regular },
                blockQuote: {
                    ...fontSizes[1.5],
                    fontFamily: fontFamilies.mono,
                    fontStyle: 'italic',
                    fontWeight: fontWeights.regular,
                },
                body: { ...fontSizes[1.125], fontFamily: fontFamilies.sans, fontWeight: fontWeights.regular },
                definition: {
                    ...fontSizes[1],
                    fontFamily: fontFamilies.mono,
                    fontWeight: fontWeights.medium,
                    textTransform: 'uppercase',
                },
                h1: { ...fontSizes[3.75], fontFamily: fontFamilies.heading, fontWeight: fontWeights.black },
                h2: { ...fontSizes[2.25], fontFamily: fontFamilies.heading, fontWeight: fontWeights.black },
                h3: { ...fontSizes[1.5], fontFamily: fontFamilies.sans, fontWeight: fontWeights.medium },
                ingress: { ...fontSizes[1.875], fontFamily: fontFamilies.sans, fontWeight: fontWeights.light },
                quote: {
                    ...fontSizes[1.125],
                    fontFamily: fontFamilies.sans,
                    fontStyle: 'italic',
                    fontWeight: fontWeights.regular,
                },
            })
        })
    })
})
