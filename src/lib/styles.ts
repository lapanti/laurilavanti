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
    [0.125]: '0.125rem' as const, // 2px
    [0.25]: '0.25rem' as const, // 4px
    [0.375]: '0.375rem' as const, // 6px
    [0.5]: '0.5rem' as const, // 8px
    [0.625]: '0.625rem' as const, // 10px
    [0.75]: '0.75rem' as const, // 12px
    [0.875]: '0.875rem' as const, // 14px
    [1]: '1rem' as const, // 16px
    [1.125]: '1.125rem' as const, // 18px
    [1.25]: '1.25rem' as const, // 20px
    [1.5]: '1.5rem' as const, // 24px
    [1.75]: '1.75rem' as const, // 28px
    [2]: '2rem' as const, // 32px
    [2.25]: '2.25rem' as const, // 36px
    [2.5]: '2.5rem' as const, // 40px
    [2.75]: '2.75rem' as const, // 44px
    [3]: '3rem' as const, // 48px
    [3.5]: '3.5rem' as const, // 56px
    [3.75]: '3.75rem' as const, // 60px
    [4]: '4rem' as const, // 64px
    [4.5]: '4.5rem' as const, // 72px
    [5]: '5rem' as const, // 80px
    [6]: '6rem' as const, // 96px
    [7]: '7rem' as const, // 112px
    [8]: '8rem' as const, // 128px
    [9]: '9rem' as const, // 144px
    [10]: '10rem' as const, // 160px
    [11]: '11rem' as const, // 176px
    [12]: '12rem' as const, // 192px
    [13]: '13rem' as const, // 208px
    [14]: '14rem' as const, // 224px
    [15]: '15rem' as const, // 240px
    [16]: '16rem' as const, // 256px
    [18]: '18rem' as const, // 288px
    [20]: '20rem' as const, // 320px
    [24]: '24rem' as const, // 384px
    [35]: '35rem' as const, // 560px
    [41]: '41rem' as const, // 656px
    [45]: '45rem' as const, // 720px
    [75]: '75rem' as const, // 1200px
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

export const HEADER_SIZE = sizes[3.75]
export const CONTENT_SIZE = sizes[75]

/** Spacing variables end */
/** Grid variables start */

export const gridAreas = {
    main: 'main' as const,
    footer: 'footer' as const,
} as const
export const gridTemplateAreasLayout = `
    " main "
    "footer"
`

export const gridTemplateRowsLayout = `1fr ${sizes[6]}` as const
export const gridTemplateRowsLayoutMobile = `1fr ${sizes[9]}` as const
export const gridTemplateColumns = 'repeat(1, minmax(0, 1fr))' as const
export const gridTemplateColumnsArticle =
    `1fr ${sizes[0.5]} min(calc(${sizes[75]} - ${sizes[1]}), calc(100% - ${sizes[1.125]})) ${sizes[0.5]} 1fr` as const

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
    evening70: 'rgba(0, 98, 114, 0.7)' as const,
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
    [0.75]: { fontSize: sizes[0.75], lineHeight: '1rem' } as const,
    [0.875]: { fontSize: '0.875rem', lineHeight: '1.25rem' } as const,
    [1]: { fontSize: '1rem', lineHeight: '1.5rem' } as const,
    [1.125]: { fontSize: '1.125rem', lineHeight: '1.75rem' } as const,
    [1.25]: { fontSize: '1.25rem', lineHeight: '1.75rem' } as const,
    [1.5]: { fontSize: '1.5rem', lineHeight: '2rem' } as const,
    [1.75]: { fontSize: '1.75rem', lineHeight: '2.25rem' } as const,
    [2.25]: { fontSize: '2.25rem', lineHeight: '2.5rem' } as const,
    [3]: { fontSize: '3rem', lineHeight: '1' } as const,
    [3.75]: { fontSize: '3.75rem', lineHeight: '1' } as const,
    [4.5]: { fontSize: '4.5rem', lineHeight: '1' } as const,
    [5]: { fontSize: '5rem', lineHeight: '1' } as const,
    [6]: { fontSize: '6rem', lineHeight: '1' } as const,
    [8]: { fontSize: '8rem', lineHeight: '1' } as const,
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
