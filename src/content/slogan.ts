import type { Lang } from './nav'

export interface Slogan {
    /** Fixed opening of the campaign slogan. */
    prefix: string
    /** Object of the slogan, shown emphasised after the prefix. */
    restingWord: string
    /** Plain-register candidacy line shown under the slogan, one entry per line. */
    candidacy: string[]
}

/** Label for the hero's call-to-action button, linking to the driving-theme section. */
export const heroCtaLabel: Record<Lang, string> = {
    en: 'Explore my platform',
    fi: 'Tutustu ohjelmaani',
    sv: 'Utforska mitt program',
}

export const sloganContent: Record<Lang, Slogan> = {
    en: {
        candidacy: ['Running for Parliament in Uusimaa'],
        prefix: 'Because technology should serve',
        restingWord: 'Finland',
    },
    fi: {
        candidacy: [
            'Johtava ohjelmistokehittäjä, DI (Aalto) · Kirkkonummen kunnanvaltuutettu',
            'Vihreiden eduskuntavaaliehdokas · Uudenmaan vaalipiiri · 2027',
        ],
        prefix: 'Koska talouden tulee palvella',
        restingWord: 'ihmistä',
    },
    sv: {
        candidacy: ['Kandiderar till riksdagen i Nyland'],
        prefix: 'Eftersom tekniken ska tjäna',
        restingWord: 'Finland',
    },
}
