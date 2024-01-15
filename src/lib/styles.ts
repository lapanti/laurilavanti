/** Screen sizes start */

export const screen = {
    biggerThanPhone: '479px' as const,
    [700]: '700px' as const,
    [750]: '750px' as const,
    [1200]: '1200px' as const,
    fullhd: '1920px' as const,
} as const

/** Screen sizes end */
/** Spacing variables start */

export const spacing = {
    [4.5]: '1.125rem' as const,
    [18]: '4.5rem' as const,
    [164]: '41rem' as const,
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
    instagram: '#E4405F' as const,
    linkedin: '#0E76A8' as const,
    mastodon: '#6363ff' as const,
    rss: '#EE802F' as const,
    transparent: 'transparent' as const,
} as const

/** Colors end */
/** Fonts begin */

export const fontFamily = {
    sans: `"IBM Plex Sans"` as const,
    mono: `"IBM Plex Mono"` as const,
    heading: `"Signika Negative"` as const,
} as const

/** Fonts end */
