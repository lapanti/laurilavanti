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
    [0.5]: '0.125rem' as const, // 2px
    [1]: '0.25rem' as const, // 4px
    [1.5]: '0.375rem' as const, // 6px
    [2]: '0.5rem' as const, // 8px
    [2.5]: '0.625rem' as const, // 10px
    [3]: '0.75rem' as const, // 12px
    [3.5]: '0.875rem' as const, // 14px
    [4]: '1rem' as const, // 16px
    [4.5]: '1.125rem' as const, // 18px
    [5]: '1.25rem' as const, // 20px
    [6]: '1.5rem' as const, // 24px
    [7]: '1.75rem' as const, // 28px
    [8]: '2rem' as const, // 32px
    [9]: '2.25rem' as const, // 36px
    [10]: '2.5rem' as const, // 40px
    [11]: '2.75rem' as const, // 44px
    [12]: '3rem' as const, // 48px
    [14]: '3.5rem' as const, // 56px
    [15]: '3.75rem' as const, // 60px
    [16]: '4rem' as const, // 64px
    [18]: '4.5rem' as const, // 72px
    [20]: '5rem' as const, // 80px
    [24]: '6rem' as const, // 96px
    [28]: '7rem' as const, // 112px
    [32]: '8rem' as const, // 128px
    [36]: '9rem' as const, // 144px
    [40]: '10rem' as const, // 160px
    [44]: '11rem' as const, // 176px
    [48]: '12rem' as const, // 192px
    [52]: '13rem' as const, // 208px
    [56]: '14rem' as const, // 224px
    [60]: '15rem' as const, // 240px
    [64]: '16rem' as const, // 256px
    [72]: '18rem' as const, // 288px
    [80]: '20rem' as const, // 320px
    [96]: '24rem' as const, // 384px
    [164]: '41rem' as const, // 656px
    fullHd: '1920px' as const,
} as const

export const zIndices = {
    [0]: 0 as const,
    [10]: 10 as const,
    [20]: 20 as const,
    [30]: 30 as const,
    [40]: 40 as const,
    [50]: 50 as const,
    auto: 'auto' as const,
} as const

/** Spacing variables end */
/** Grid variables start */

export const gridAreas = {
    main: 'main' as const,
    footer: 'footer' as const,
} as const
export const gridTemplateAreasLayout = `
    "header"
    " main "
    "footer"
`

/** Header is 60px tall, minus gap of 18px and footer is 96px */
export const gridTemplateRowsLayout = `42px 1fr ${sizes[24]}` as const
export const gridTemplateColumns = 'repeat(1, minmax(0, 1fr))' as const
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
    white75: 'rgba(255, 255, 255, .75)' as const,
    white90: 'rgba(255, 255, 255, .9)' as const,
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
    threads: 'rgb(0, 0, 0)' as const,
    instagram: '#E4405F' as const,
    instagramGradient: 'url(#instagram-gradient)' as const,
    linkedin: '#0E76A8' as const,
    mastodon: '#6363ff' as const,
    bluesky: '#0060df' as const,
    rss: '#EE802F' as const,
    transparent: 'transparent' as const,
} as const

export const gradients = {
    fromBlackToTop: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))' as const,
    fromLeftToRight: 'linear-gradient(to right, rgba(0,0,0,.85), rgba(0,0,0,.05), rgba(0, 0, 0, 0))' as const,
} as const

export const shadows = {
    base: '0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
}

/** Colors end */
/** Fonts begin */

export const fontSizes = {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' } as const,
    s: { fontSize: '0.875rem', lineHeight: '1.25rem' } as const,
    m: { fontSize: '1rem', lineHeight: '1.5rem' } as const,
    l: { fontSize: '1.125rem', lineHeight: '1.75rem' } as const,
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' } as const,
    ['2xl']: { fontSize: '1.5rem', lineHeight: '2rem' } as const,
    ['3xl']: { fontSize: '1.75rem', lineHeight: '2.25rem' } as const,
    ['4xl']: { fontSize: '2.25rem', lineHeight: '2.5rem' } as const,
    ['5xl']: { fontSize: '3rem', lineHeight: '1' } as const,
    ['6xl']: { fontSize: '3.75rem', lineHeight: '1' } as const,
    ['7xl']: { fontSize: '4.5rem', lineHeight: '1' } as const,
    ['8xl']: { fontSize: '6rem', lineHeight: '1' } as const,
    ['9xl']: { fontSize: '8rem', lineHeight: '1' } as const,
} as const

export const fontFamilies = {
    sans: `"IBM Plex Sans"` as const,
    mono: `"IBM Plex Mono"` as const,
    heading: `"Krana Fat"` as const,
} as const

export const fontWeights = {
    normal: 400,
    bold: 700,
    black: 900,
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
