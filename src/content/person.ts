import type { Lang } from './nav'

import { getImage } from '../lib/images'

export const PERSON_ID = 'https://laurilavanti.fi/fi/about/#person'

export const personBlueskyHandle = 'laurilavanti.fi'
export const personThreadsHandle = 'laurilavanti'
export const personMastodonInstance = 'mastodon.social'
export const personMastodonHandle = `laurilavanti@${personMastodonInstance}`

export const personName = 'Lauri Lavanti'
export const personGivenName = 'Lauri'
export const personFamilyName = 'Lavanti'
export const personBirthDate = '1991-10-01'
export const personBirthPlace = { '@type': 'Place', name: 'Jyväskylä' }
export const personNationality = { '@type': 'Country', name: 'FI' }
export const personUrl = 'https://laurilavanti.fi/fi/'

export function getPersonImageUrl(): Promise<string> {
    return Promise.resolve(getImage('Lauri-Lavanti-seisoo-suorassa-sinisella-taustalla', 'og').src)
}

export const personSameAs = [
    'https://bsky.app/profile/laurilavanti.fi',
    'https://www.facebook.com/laurilavanti',
    'https://www.instagram.com/laurilavanti/',
    'https://www.linkedin.com/in/lapanti',
    'https://mastodon.social/@laurilavanti',
    'https://www.threads.com/@laurilavanti',
    'https://www.tiktok.com/@laurilavanti',
    'https://fi.wikipedia.org/wiki/Lauri_Lavanti',
    'https://www.wikidata.org/wiki/Q139711658',
]

export const personJobTitle: Record<Lang, string> = {
    en: 'municipal councillor & lead developer',
    fi: 'kunnanvaltuutettu ja johtava ohjelmistokehittäjä',
    sv: 'kommunfullmäktigeledamot och ledande mjukvaruutvecklare',
}

export const personDescription: Record<Lang, string> = {
    en: 'Kirkkonummi municipal councillor (Greens) and lead developer (MSc, Aalto). He works to build a digitally independent Finland where the economy, education, and rights work together in the age of AI.',
    fi: 'Kirkkonummen kunnanvaltuutettu ja johtava ohjelmistokehittäjä (DI, Aalto). Hänen tavoitteenaan on digitaalisesti itsenäinen Suomi, jossa talous, sivistys ja vapaus toimivat yhdessä tekoälyn aikakaudella.',
    sv: 'Lauri Lavanti är fullmäktigeledamot i Kyrkslätt (De Gröna) och ledande mjukvaruutvecklare (DI, Aalto-universitetet). Hans mål är ett digitalt självständigt Finland där ekonomi, bildning och frihet fungerar tillsammans i AI-tidsåldern.',
}

export const personKnowsAbout: Record<Lang, string[]> = {
    en: [
        'Artificial intelligence',
        'Digital independence',
        'Economic policy',
        'Market economy',
        'Marketgreen',
        'Entrepreneurship',
        'Education',
        'Fundamental rights',
        'Privacy',
        'Responsible AI',
        'Parliamentary elections',
        'Finnish-language AI models',
        'Public procurement portability',
        'Foundation-owned companies',
        'Public administration',
    ],
    fi: [
        'Tekoäly',
        'Digitaalinen itsenäisyys',
        'Talouspolitiikka',
        'Markkinatalous',
        'Markkinavihreä',
        'Yrittäjyys',
        'Sivistys',
        'Perusoikeudet',
        'Yksityisyys',
        'Vastuullinen tekoäly',
        'Eduskuntavaalit',
        'Suomenkieliset tekoälymallit',
        'Julkishankintojen siirrettävyys',
        'Säätiö-omisteiset yhtiöt',
        'Julkishallinto',
    ],
    sv: [
        'Artificiell intelligens',
        'Digital självständighet',
        'Ekonomisk politik',
        'Marknadsekonomi',
        'Marknadsgrön',
        'Företagande',
        'Bildning',
        'Grundläggande rättigheter',
        'Integritet',
        'Ansvarsfull AI',
        'Riksdagsval',
        'Finskspråkiga AI-modeller',
        'Överförbarhet av offentliga upphandlingar',
        'Stiftelseägda bolag',
        'Offentlig förvaltning',
    ],
}

export const personKnowsLanguage = ['fi', 'en', 'sv']

export const personWorksFor = {
    '@type': 'Organization',
    name: 'OP',
    url: 'https://www.op.fi/',
}

export const personAlumniOf = [
    { '@type': 'CollegeOrUniversity', name: 'Aalto-yliopisto', url: 'https://www.aalto.fi/' },
    { '@type': 'EducationalOrganization', name: 'Omnia', url: 'https://www.omnia.fi/' },
    { '@type': 'HighSchool', name: 'Masalan lukio' },
]

export const personMemberOf = {
    '@type': 'PoliticalParty',
    name: 'Vihreä liitto',
    url: 'https://www.vihreat.fi',
}

export const personAffiliation = [
    {
        '@type': 'Organization',
        name: 'Digitaalinen itsenäisyys -kansalaisaloite',
        url: 'https://digitaalinenitsenaisyys.fi/',
    },
]

export const personHasOccupation: Record<Lang, object[]> = {
    en: [
        {
            '@type': 'Occupation',
            name: 'Municipal councillor',
            occupationLocation: { '@type': 'City', name: 'Kirkkonummi' },
            skills: 'Digital policy, AI governance, economic policy, entrepreneurship, local government',
        },
        {
            '@type': 'Occupation',
            name: 'Lead developer',
            skills: 'Artificial intelligence, software architecture, digital sovereignty, secure software development',
        },
    ],
    fi: [
        {
            '@type': 'Occupation',
            name: 'Kunnanvaltuutettu',
            occupationLocation: { '@type': 'City', name: 'Kirkkonummi' },
            skills: 'Digitaalinen politiikka, tekoälyhallinto, talouspolitiikka, yrittäjyys, julkishallinto',
        },
        {
            '@type': 'Occupation',
            name: 'Johtava ohjelmistokehittäjä',
            skills: 'Tekoäly, ohjelmistoarkkitehtuuri, digitaalinen itsenäisyys, tietoturvallinen ohjelmistokehitys',
        },
    ],
    sv: [
        {
            '@type': 'Occupation',
            name: 'Kommunfullmäktigeledamot',
            occupationLocation: { '@type': 'City', name: 'Kyrkslätt' },
            skills: 'Digital politik, AI-styrning, ekonomisk politik, företagande, kommunal förvaltning',
        },
        {
            '@type': 'Occupation',
            name: 'Ledande mjukvaruutvecklare',
            skills: 'Artificiell intelligens, programvaruarkitektur, digital självständighet, säker mjukvaruutveckling',
        },
    ],
}

export type AuthorEntry =
    | 'lauri'
    | {
          name: string
          url?: string
          sameAs?: string[]
          role?: string
      }
