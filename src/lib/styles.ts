/** Screen sizes start */

export const breakpoints = {
    biggerThanPhone: {
        min: '@media (min-width: 479px)',
        max: '@media not all and (min-width: 479px)',
    } as const,
    [700]: {
        min: '@media (min-width: 700px)',
        max: '@media not all and (min-width: 700px)',
    } as const,
    [750]: {
        min: '@media (min-width: 750px)',
        max: '@media not all and (min-width: 750px)',
    } as const,
    [1200]: {
        min: '@media (min-width: 1200px)',
        max: '@media not all and (min-width: 1200px)',
    } as const,
    fullhd: {
        min: '@media (min-width: 1920px)',
        max: '@media not all and (min-width: 1920px)',
    } as const,
} as const

/** Screen sizes end */
/** Spacing variables start */

export const sizes = {
    [0]: '0px' as const,
    [2]: '0.5rem' as const,
    [4]: '1rem' as const,
    [4.5]: '1.125rem' as const,
    [6]: '1.5rem' as const,
    [8]: '2rem' as const,
    [18]: '4.5rem' as const,
    [164]: '41rem' as const,
    fullHd: '1920px' as const,
} as const

/** Spacing variables end */
/** Grid variables start */

export const gridTemplateAreasLayout = [' main ', 'footer'] as const
export const gridTemplateRowsLayout = '1fr 6rem' as const
export const gridTemplateColumnsArticle = '1fr 0.5rem min(80ch, calc(100% - 1.125rem)) 0.5rem 1fr' as const

/** Grid variables end */

/** Colors start */

export const colors = {
    greenDarkBackground: 'rgb(40, 71, 52)' as const,
    greenDarkText: 'rgb(0, 104, 69)' as const,
    greenBright: 'rgb(0, 150, 57)' as const,
    greenLight: 'rgb(217, 234, 154)' as const,
    black: 'rgb(0, 0, 0)' as const,
    gray: 'rgb(235, 235, 236)' as const,
    white: 'rgb(255, 255, 255)' as const,
    fire: 'rgb(240, 100, 0)' as const,
    evening: 'rgb(0, 98, 114)' as const,
    moss: 'rgb(90, 94, 0)' as const,
    ocher: 'rgb(218, 170, 0)' as const,
    plum: 'rgb(112, 39, 61)' as const,
    peach: 'rgb(248, 207, 169)' as const,
    sky: 'rgb(187, 221, 230)' as const,
    oats: 'rgb(228, 215, 126)' as const,
    sand: 'rgb(214, 210, 196)' as const,
    facebook: '#4267B2' as const,
    xtwitter: 'rgb(0, 0, 0)' as const,
    threads: 'rgb(0, 0, 0)' as const,
    instagram: '#E4405F' as const,
    instagramGradient: 'url(#instagram-gradient)' as const,
    linkedin: '#0E76A8' as const,
    mastodon: '#6363ff' as const,
    rss: '#EE802F' as const,
    transparent: 'transparent' as const,
} as const

/** Colors end */
/** Fonts begin */

export const fontSizes = {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' } as const,
    s: { fontSize: '0.875rem', lineHeight: '1.25rem' } as const,
    m: { fontSize: '1rem', lineHeight: '1.5rem' } as const,
    l: { fontSize: '1.125rem', lineHeight: '1.75rem' } as const,
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' } as const,
    ['2xl']: { fontSize: '1.5rem', lineHeight: '2rem' } as const,
    ['3xl']: { fontSize: '1.875rem', lineHeight: '2.25rem' } as const,
    ['4xl']: { fontSize: '2.25rem', lineHeihgt: '2.5rem' } as const,
    ['5xl']: { fontSize: '3rem', lineHeight: '1' } as const,
    ['6xl']: { fontSize: '3.75rem', lineHeight: '1' } as const,
    ['7xl']: { fontSize: '4.5rem', lineHeight: '1' } as const,
    ['8xl']: { fontSize: '6rem', lineHeight: '1' } as const,
    ['9xl']: { fontSize: '8rem', lineHeight: '1' } as const,
} as const

export const fontFamily = {
    sans: `"IBM Plex Sans"` as const,
    mono: `"IBM Plex Mono"` as const,
    heading: `"Signika Negative"` as const,
} as const

export const fontWeights = {
    bold: 700,
} as const

/** Fonts end */
/** Transitions begin */

export const transitions = {
    base: {
        transitionProperty:
            'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
    } as const,
} as const

/** Transitions end */
