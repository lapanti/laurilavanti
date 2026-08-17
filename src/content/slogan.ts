import type { Lang } from './nav'

export interface Slogan {
    /** Fixed opening of the campaign slogan. */
    prefix: string
    /** Objects typed after the prefix, in order. The last one is the resting state. */
    words: [string, string, string, string]
    /** Plain-register candidacy line shown under the slogan. */
    candidacy: string
}

export const sloganContent: Record<Lang, Slogan> = {
    en: {
        candidacy: 'Running for Parliament in Uusimaa',
        prefix: 'Because technology should serve',
        words: ['the economy', 'education', 'rights', 'Finland'],
    },
    fi: {
        candidacy: 'Ehdolla eduskuntaan Uudellamaalla',
        prefix: 'Koska teknologian tulee palvella',
        words: ['taloutta', 'sivistystä', 'vapautta', 'Suomea'],
    },
    sv: {
        candidacy: 'Kandiderar till riksdagen i Nyland',
        prefix: 'Eftersom tekniken ska tjäna',
        words: ['ekonomin', 'utbildningen', 'friheten', 'Finland'],
    },
}
