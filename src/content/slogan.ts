import type { Lang } from './nav'

export interface Slogan {
    /** Fixed opening of the campaign slogan. */
    prefix: string
    /** Objects typed after the prefix, in order. The last one is the resting state. */
    words: [string, string, string, string]
    /** Plain-register candidacy line shown under the slogan. */
    candidacy: string
}

/** Label for the hero's call-to-action button, linking to the driving-theme section. */
export const heroCtaLabel: Record<Lang, string> = {
    en: 'Explore my platform',
    fi: 'Tutustu ohjelmaani',
    sv: 'Utforska mitt program',
}

export const sloganContent: Record<Lang, Slogan> = {
    en: {
        candidacy: 'Running for Parliament in Uusimaa',
        prefix: 'Because technology should serve',
        words: ['the economy', 'education', 'rights', 'Finland'],
    },
    fi: {
        candidacy:
            'Johtava ohjelmistokehittäjä, DI (Aalto) · Kirkkonummen kunnanvaltuutettu · Vihreiden eduskuntavaaliehdokas · Uudenmaan vaalipiiri · 2027',
        prefix: 'Koska talouden tulee palvella',
        words: ['taloutta', 'sivistystä', 'vapautta', 'ihmistä'],
    },
    sv: {
        candidacy: 'Kandiderar till riksdagen i Nyland',
        prefix: 'Eftersom tekniken ska tjäna',
        words: ['ekonomin', 'utbildningen', 'friheten', 'Finland'],
    },
}
