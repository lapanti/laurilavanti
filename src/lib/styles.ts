/** Spacing variables start */

export const sizes = {
    [0]: '0px' as const,
    [0.5]: '0.5rem' as const, // 8px
    [0.25]: '0.25rem' as const, // 4px
    [0.125]: '0.125rem' as const, // 2px
    [0.875]: '0.875rem' as const, // 14px
    [0.1875]: '0.1875rem' as const, // 3px
    [1]: '1rem' as const, // 16px
    [1.5]: '1.5rem' as const, // 24px
    [1.25]: '1.25rem' as const, // 20px
    [1.75]: '1.75rem' as const, // 28px
    [1.125]: '1.125rem' as const, // 18px
    [1.875]: '1.875rem' as const, // 30px
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
    [6.25]: '6.25rem' as const, // 100px — SummaryBox collapsed height (3 list rows)
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
    [50]: 50 as const,
    [100]: 100 as const,
} as const

export const HEADER_SIZE = sizes[5]
export const CONTENT_SIZE = sizes[75]
export const CONTENT_PADDING = sizes[0.5]

/** Spacing variables end */
/** Grid variables start */

export const gridAreas = {
    footer: 'footer' as const,
    main: 'main' as const,
} as const

export const gridTemplateRowsLayout = `1fr auto` as const
export const gridTemplateRowsLayoutMobile = `1fr auto` as const
export const gridTemplateColumns = 'repeat(1, minmax(0, 1fr))' as const
export const gridTemplateColumnsArticle =
    `1fr ${CONTENT_PADDING} min(calc(${sizes[75]} - ${sizes[1]}), calc(100% - ${sizes[1.125]})) ${CONTENT_PADDING} 1fr` as const

/** Grid variables end */

/** Colors start */

/**
 * Legacy palette entries `forestGreen`, `sand`, `peach`, `gray` and `white` are exact
 * hex matches for the Signal Band palette below and are reused there as-is (see the
 * inline notes). The rest (`evening`, `moss`, `darkMoss`, `sky`, `darkGreenText`) are
 * pre-rebrand tokens kept alive only for components not yet migrated to the Signal
 * Band system (visual rebrand, in progress) — do not use them in new work.
 *
 * The Signal Band palette itself (visual rebrand): five signal colors — `pineGreen`,
 * `vividGreen`, `skyAqua`, `brightSky`, `signalBlue` — plus grounds and the matched
 * accent-plate ink pairs (`oat*`, `peachInk*`, `aqua*`, `blue*`).
 */
export const colors = {
    aquaInk: '#12312C' as const,
    aquaInkSoft: '#466661' as const,
    black: 'rgb(0, 0, 0)' as const,
    blueInk: '#122631' as const,
    blueInkSoft: '#465A66' as const,
    bluesky: '#0060df' as const,
    brightSky: '#59B9F1' as const,
    darkGreenText: 'rgb(0, 104, 69)' as const,
    darkMoss: 'rgb(72, 75, 0)' as const, // Darker version of Moss to get AAA accessibility contrast
    evening: 'rgb(0, 98, 114)' as const,
    evening70: 'rgba(0, 98, 114, 0.7)' as const,
    eyebrowNeutral: '#5B5952' as const,
    facebook: '#4267B2' as const,
    footerMuted: '#A9CFCB' as const,
    forestGreen: 'rgb(22, 62, 53)' as const, // = Signal Band deepForest (#163E35)
    forestGreen70: 'rgba(22, 62, 53, 0.7)' as const,
    gray: 'rgb(235, 235, 236)' as const, // = Signal Band lightGray (#EBEBEC)
    instagramGradient: 'url(#instagram-gradient)' as const,
    lightSand: '#E9E4D4' as const,
    linkedin: '#0E76A8' as const,
    mastodon: '#6363ff' as const,
    moss: 'rgb(90, 94, 0)' as const,
    oatInk: '#2A2A18' as const,
    oatInkSoft: '#625E37' as const,
    oatYellow: '#E4D77E' as const,
    offWhite: '#F5F5F5' as const,
    onOatBody: '#20463C' as const,
    onOatEyebrow: '#3E5C4E' as const,
    peach: 'rgb(248, 207, 169)' as const, // = Signal Band peach (#F8CFA9)
    peachInk: '#33251A' as const,
    peachInkSoft: '#6E5845' as const,
    pineGreen: '#006845' as const,
    regionalPurple: '#865C97' as const,
    rss: '#f26522' as const,
    sand: 'rgb(214, 210, 196)' as const, // = Signal Band sand (#D6D2C4)
    signalBlue: '#317CE6' as const,
    sky: '#bbdde6' as const,
    skyAqua: '#BFE1DE' as const,
    textPrimary: '#1B211C' as const,
    textSecondary: '#4A4E45' as const,
    threads: 'rgb(0, 0, 0)' as const,
    transparent: 'transparent' as const,
    vividGreen: '#009639' as const,
    white: 'rgb(255, 255, 255)' as const,
} as const

/** Colors end */
/** Fonts begin */

export const fontSizes = {
    [1]: { fontSize: '1rem', lineHeight: '1.5' } as const,
    [1.5]: { fontSize: sizes[1.5], lineHeight: '1.2' } as const,
    [1.25]: { fontSize: sizes[1.25], lineHeight: '1.5' } as const,
    [1.75]: { fontSize: sizes[1.75], lineHeight: '1.2' } as const,
    [1.125]: { fontSize: sizes[1.125], lineHeight: '1.2' } as const,
    [1.875]: { fontSize: sizes[1.875], lineHeight: '1.5' } as const,
    [2.25]: { fontSize: sizes[2.25], lineHeight: '1.2' } as const,
    [3]: { fontSize: sizes[3], lineHeight: '1.2' } as const,
    [3.75]: { fontSize: sizes[3.75], lineHeight: '1.2' } as const,
    [5]: { fontSize: sizes[5], lineHeight: '1.2' } as const,
    [6]: { fontSize: sizes[6], lineHeight: '1.2' } as const,
} as const

export const fontFamilies = {
    heading: `"Big Shoulders Display", Trebuchet MS` as const,
    mono: `"IBM Plex Mono", Lucida Sans Typewriter` as const,
    sans: `"IBM Plex Sans", Trebuchet MS` as const,
} as const

/**
 * Signal Band fallback stacks (visual rebrand) — wider than the legacy stacks above, so
 * the condensed/humanist-sans character survives even if the webfont fails to load. Used
 * by the new typographics roles below; the legacy h1/h2/h3/body/etc. roles keep the old
 * fallbacks so components not yet migrated don't churn their rendered snapshots.
 */
export const signalBandFontFamilies = {
    heading: `"Big Shoulders Display", "Haettenschweiler", "Arial Narrow", sans-serif` as const,
    sans: `"IBM Plex Sans", "Segoe UI", Helvetica, Arial, sans-serif` as const,
} as const

export const fontWeights = {
    black: 900,
    bold: 700,
    extrabold: 800,
    light: 300,
    medium: 500,
    regular: 400,
    semibold: 600,
} as const

/**
 * Signal Band roles (visual rebrand) are named after the design system's own vocabulary
 * (display/headline/eyebrow/nav/button/label/meta/chip/lede/title...) rather than the
 * legacy h1/h2/h3/body/ingress/quote roles above, so the two sets can't collide. Legacy
 * roles are dropped once every consumer has migrated (tracked across the rebrand phases).
 */
export const typographics = {
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
    quote: { ...fontSizes[1.125], fontFamily: fontFamilies.sans, fontStyle: 'italic', fontWeight: fontWeights.regular },
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
} as const

/** Fonts end */
