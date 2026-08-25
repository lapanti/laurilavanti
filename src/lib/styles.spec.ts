import { describe, expect, it } from 'vitest'

import {
    colors,
    CONTENT_PADDING,
    CONTENT_SIZE,
    fontFamilies,
    fontSizes,
    fontWeights,
    HEADER_SIZE,
    signalBandFontFamilies,
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
                [6.25]: '6.25rem',
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
            expect(zIndices).toEqual({ [50]: 50, [100]: 100 })
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
                aquaInk: '#12312C',
                aquaInkSoft: '#466661',
                black: 'rgb(0, 0, 0)',
                blueInk: '#122631',
                blueInkSoft: '#465A66',
                bluesky: '#0060df',
                brightSky: '#59B9F1',
                darkGreenText: 'rgb(0, 104, 69)',
                darkMoss: 'rgb(72, 75, 0)',
                evening: 'rgb(0, 98, 114)',
                evening70: 'rgba(0, 98, 114, 0.7)',
                eyebrowNeutral: '#5B5952',
                facebook: '#4267B2',
                footerMuted: '#A9CFCB',
                forestGreen: 'rgb(22, 62, 53)',
                forestGreen70: 'rgba(22, 62, 53, 0.7)',
                gray: 'rgb(235, 235, 236)',
                instagramGradient: 'url(#instagram-gradient)',
                lightSand: '#E9E4D4',
                linkedin: '#0E76A8',
                mastodon: '#6363ff',
                moss: 'rgb(90, 94, 0)',
                oatInk: '#2A2A18',
                oatInkSoft: '#625E37',
                oatYellow: '#E4D77E',
                offWhite: '#F5F5F5',
                onOatBody: '#20463C',
                onOatEyebrow: '#3E5C4E',
                peach: 'rgb(248, 207, 169)',
                peachInk: '#33251A',
                peachInkSoft: '#6E5845',
                pineGreen: '#006845',
                regionalPurple: '#865C97',
                rss: '#f26522',
                sand: 'rgb(214, 210, 196)',
                signalBlue: '#317CE6',
                sky: '#bbdde6',
                skyAqua: '#BFE1DE',
                textPrimary: '#1B211C',
                textSecondary: '#4A4E45',
                threads: 'rgb(0, 0, 0)',
                transparent: 'transparent',
                vividGreen: '#009639',
                white: 'rgb(255, 255, 255)',
            })
        })
    })

    describe('fontSizes', () => {
        it('should stay the same', () => {
            expect(fontSizes).toEqual({
                [1]: { fontSize: '1rem', lineHeight: '1.5' },
                [1.5]: { fontSize: sizes[1.5], lineHeight: '1.2' },
                [1.25]: { fontSize: sizes[1.25], lineHeight: '1.5' },
                [1.75]: { fontSize: sizes[1.75], lineHeight: '1.2' },
                [1.125]: { fontSize: sizes[1.125], lineHeight: '1.2' },
                [1.875]: { fontSize: sizes[1.875], lineHeight: '1.5' },
                [2.25]: { fontSize: sizes[2.25], lineHeight: '1.2' },
                [3]: { fontSize: sizes[3], lineHeight: '1.2' },
                [3.75]: { fontSize: sizes[3.75], lineHeight: '1.2' },
                [5]: { fontSize: sizes[5], lineHeight: '1.2' },
                [6]: { fontSize: sizes[6], lineHeight: '1.2' },
            })
        })
    })

    describe('fontFamilies', () => {
        it('should stay the same', () => {
            expect(fontFamilies).toEqual({
                heading: `"Big Shoulders Display", Trebuchet MS`,
                mono: `"IBM Plex Mono", Lucida Sans Typewriter`,
                sans: `"IBM Plex Sans", Trebuchet MS`,
            })
        })
    })

    describe('signalBandFontFamilies', () => {
        it('should stay the same', () => {
            expect(signalBandFontFamilies).toEqual({
                heading: `"Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif`,
                sans: `"IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif`,
            })
        })
    })

    describe('fontWeights', () => {
        it('should stay the same', () => {
            expect(fontWeights).toEqual({
                black: 900,
                bold: 700,
                extrabold: 800,
                light: 300,
                medium: 500,
                regular: 400,
                semibold: 600,
            })
        })
    })

    describe('typographics', () => {
        it('should stay the same', () => {
            expect(typographics).toEqual({
                additionalInfo: { ...fontSizes[1], fontFamily: fontFamilies.mono, fontWeight: fontWeights.regular },
                articleHeadline: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '42px',
                    fontWeight: fontWeights.black,
                    letterSpacing: '-0.01em',
                    lineHeight: '1.02',
                    textTransform: 'uppercase',
                },
                articleLead: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '21px',
                    fontWeight: fontWeights.medium,
                    lineHeight: '1.5',
                },
                blockQuote: {
                    ...fontSizes[1.5],
                    fontFamily: fontFamilies.mono,
                    fontStyle: 'italic',
                    fontWeight: fontWeights.regular,
                },
                body: { ...fontSizes[1.25], fontFamily: fontFamilies.sans, fontWeight: fontWeights.regular },
                button: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '21px',
                    fontWeight: fontWeights.extrabold,
                    letterSpacing: '0.07em',
                    lineHeight: '1.4',
                    textTransform: 'uppercase',
                },
                caption: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '12px',
                    fontWeight: fontWeights.regular,
                    lineHeight: '1.68',
                },
                chip: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '11px',
                    fontWeight: fontWeights.bold,
                    letterSpacing: '0.13em',
                    lineHeight: '18.48px',
                    textTransform: 'uppercase',
                },
                definition: {
                    ...fontSizes[1],
                    fontFamily: fontFamilies.mono,
                    fontWeight: fontWeights.medium,
                    textTransform: 'uppercase',
                },
                display: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '120px',
                    fontWeight: fontWeights.black,
                    letterSpacing: '-0.02em',
                    lineHeight: '1',
                    textTransform: 'uppercase',
                },
                displayPillar: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '108px',
                    fontWeight: fontWeights.black,
                    letterSpacing: '-0.015em',
                    lineHeight: '1',
                    textTransform: 'uppercase',
                },
                displaySynthesis: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '110px',
                    fontWeight: fontWeights.black,
                    letterSpacing: '-0.02em',
                    lineHeight: '1',
                    textTransform: 'uppercase',
                },
                eyebrow: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '15px',
                    fontWeight: fontWeights.bold,
                    letterSpacing: '0.176em',
                    lineHeight: '1.3',
                    textTransform: 'uppercase',
                },
                fine: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '13px',
                    fontWeight: fontWeights.regular,
                    lineHeight: '1.68',
                },
                h1: { ...fontSizes[3], fontFamily: fontFamilies.heading, fontWeight: fontWeights.black },
                h2: { ...fontSizes[2.25], fontFamily: fontFamilies.heading, fontWeight: fontWeights.black },
                h3: { ...fontSizes[1.5], fontFamily: fontFamilies.sans, fontWeight: fontWeights.medium },
                headline: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '58px',
                    fontWeight: fontWeights.black,
                    letterSpacing: '-0.015em',
                    lineHeight: '1',
                    textTransform: 'uppercase',
                },
                heroFoot: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '16px',
                    fontWeight: fontWeights.regular,
                    lineHeight: '1.5',
                },
                heroKicker: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '16px',
                    fontWeight: fontWeights.bold,
                    letterSpacing: '0.165em',
                    lineHeight: '1.4',
                    textTransform: 'uppercase',
                },
                ingress: { ...fontSizes[1.875], fontFamily: fontFamilies.sans, fontWeight: fontWeights.light },
                lede: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '19px',
                    fontWeight: fontWeights.regular,
                    lineHeight: '1.68',
                },
                linkRule: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '14px',
                    fontWeight: fontWeights.bold,
                    letterSpacing: '0.12em',
                    lineHeight: '1.68',
                    textTransform: 'uppercase',
                },
                meta: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '14px',
                    fontWeight: fontWeights.bold,
                    letterSpacing: '0.137em',
                    lineHeight: '1.3',
                    textTransform: 'uppercase',
                },
                nav: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '18px',
                    fontWeight: fontWeights.bold,
                    letterSpacing: '0.055em',
                    lineHeight: '1.3',
                    textTransform: 'uppercase',
                },
                navMobile: {
                    fontFamily: signalBandFontFamilies.heading,
                    fontSize: '26px',
                    fontWeight: fontWeights.bold,
                    letterSpacing: '0.055em',
                    lineHeight: '1.3',
                    textTransform: 'uppercase',
                },
                pillarAnswer: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '20px',
                    fontWeight: fontWeights.medium,
                    lineHeight: '1.5',
                },
                postTitle: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '18px',
                    fontWeight: fontWeights.semibold,
                    lineHeight: '1.3',
                },
                quote: {
                    ...fontSizes[1.125],
                    fontFamily: fontFamilies.sans,
                    fontStyle: 'italic',
                    fontWeight: fontWeights.regular,
                },
                text: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '17px',
                    fontWeight: fontWeights.regular,
                    lineHeight: '1.68',
                },
                textSmall: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '15px',
                    fontWeight: fontWeights.regular,
                    lineHeight: '1.68',
                },
                title: {
                    fontFamily: signalBandFontFamilies.sans,
                    fontSize: '19px',
                    fontWeight: fontWeights.semibold,
                    lineHeight: '1.3',
                },
            })
        })
    })
})
