/** Screen sizes start */

export const breakpoints = {
    [1200]: {
        max: '@media not all and (min-width: 1200px)',
        min: '@media (min-width: 1200px)',
    } as const,
} as const

/** Screen sizes end */
/** Spacing variables start */

export const sizes = {
    [0]: '0px' as const,
    [0.5]: '0.5rem' as const, // 8px
    [0.25]: '0.25rem' as const, // 4px
    [0.875]: '0.875rem' as const, // 14px
    [1]: '1rem' as const, // 16px
    [1.5]: '1.5rem' as const, // 24px
    [1.25]: '1.25rem' as const, // 20px
    [1.75]: '1.75rem' as const, // 28px
    [1.125]: '1.125rem' as const, // 18px
    [2]: '2rem' as const, // 32px
    [2.5]: '2.5rem' as const, // 40px
    [2.25]: '2.25rem' as const, // 36px
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
    [14]: '14rem' as const, // 224px
    [24]: '24rem' as const, // 384px
    [35]: '35rem' as const, // 560px
    [37.5]: '37.5rem' as const, // 600px
    [45]: '45rem' as const, // 720px
    [75]: '75rem' as const, // 1200px
} as const

export const zIndices = {
    [40]: 40 as const,
    [50]: 50 as const,
} as const

export const HEADER_SIZE = sizes[3.75]
export const CONTENT_SIZE = sizes[75]
export const CONTENT_PADDING = sizes[0.5]

/** Spacing variables end */
/** Grid variables start */

export const gridAreas = {
    footer: 'footer' as const,
    main: 'main' as const,
} as const
export const gridTemplateAreasLayout = `
    "${gridAreas.main}"
    "${gridAreas.footer}"
`

export const gridTemplateRowsLayout = `1fr ${sizes[6]}` as const
export const gridTemplateRowsLayoutMobile = `1fr ${sizes[9]}` as const
export const gridTemplateColumns = 'repeat(1, minmax(0, 1fr))' as const
export const gridTemplateColumnsArticle =
    `1fr ${CONTENT_PADDING} min(calc(${sizes[75]} - ${sizes[1]}), calc(100% - ${sizes[1.125]})) ${CONTENT_PADDING} 1fr` as const

/** Grid variables end */

/** Colors start */

export const colors = {
    black: 'rgb(0, 0, 0)' as const,
    bluesky: '#0060df' as const,
    darkGreenText: 'rgb(0, 104, 69)' as const,
    evening: 'rgb(0, 98, 114)' as const,
    evening70: 'rgba(0, 98, 114, 0.7)' as const,
    facebook: '#4267B2' as const,
    gray: 'rgb(235, 235, 236)' as const,
    instagramGradient: 'url(#instagram-gradient)' as const,
    linkedin: '#0E76A8' as const,
    mastodon: '#6363ff' as const,
    moss: 'rgb(90, 94, 0)' as const,
    peach: 'rgb(248, 207, 169)' as const,
    regionalPurple: '#865C97' as const,
    sand: 'rgb(214, 210, 196)' as const,
    threads: 'rgb(0, 0, 0)' as const,
    transparent: 'transparent' as const,
    white: 'rgb(255, 255, 255)' as const,
} as const

/** Colors end */
/** Fonts begin */

export const fontSizes = {
    [1]: { fontSize: '1rem', lineHeight: '1.5rem' } as const,
    [1.5]: { fontSize: sizes[1.5], lineHeight: '2rem' } as const,
    [1.25]: { fontSize: sizes[1.25], lineHeight: '1.75rem' } as const,
    [1.75]: { fontSize: sizes[1.75], lineHeight: '2.25rem' } as const,
    [1.125]: { fontSize: sizes[1.125], lineHeight: '1.75rem' } as const,
    [2.25]: { fontSize: sizes[2.25], lineHeight: '2.5rem' } as const,
    [3]: { fontSize: sizes[3], lineHeight: '1' } as const,
    [3.75]: { fontSize: sizes[3.75], lineHeight: '1' } as const,
    [5]: { fontSize: sizes[5], lineHeight: '1' } as const,
    [6]: { fontSize: sizes[6], lineHeight: '1' } as const,
} as const

export const fontFamilies = {
    heading: `"Krana Fat", Trebuchet MS` as const,
    mono: `"IBM Plex Mono", Lucida Sans Typewriter` as const,
    sans: `"IBM Plex Sans", Trebuchet MS` as const,
} as const

export const fontWeights = {
    black: 1000,
    bold: 700,
    normal: 400,
} as const

/** Fonts end */
/** Transitions begin */

export const transitions = {
    base: {
        transitionDuration: '150ms',
        transitionProperty:
            'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    } as const,
} as const

/** Transitions end */
