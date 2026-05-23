import { getCldImageUrl } from 'astro-cloudinary/helpers' // eslint-disable-line import/namespace

import type { Lang } from './nav'

export const PERSON_ID = 'https://laurilavanti.fi/fi/about/#person'

export const personName = 'Lauri Lavanti'
export const personGivenName = 'Lauri'
export const personFamilyName = 'Lavanti'
export const personBirthDate = '1991-10-01'
export const personBirthPlace = { '@type': 'Place', name: 'Jyväskylä' }
export const personNationality = { '@type': 'Country', name: 'FI' }
export const personUrl = 'https://laurilavanti.fi/fi/'

export const personImage = getCldImageUrl({
    crop: { gravity: 'north', source: true, type: 'fill' },
    height: 1200,
    src: 'Lauri-Lavanti-seisoo-suorassa-sinisella-taustalla',
    width: 1200,
})

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
    en: 'Municipal councillor & Lead Developer',
    fi: 'Kunnanvaltuutettu ja johtava ohjelmistokehittäjä',
    sv: 'Kommunfullmäktigeledamot och ledande mjukvarutvecklare',
}

export const personDescription: Record<Lang, string> = {
    en: 'Municipal councillor in Kirkkonummi (Greens) and lead software developer. Focused on economics, entrepreneurship, digital independence, and responsible AI policy.',
    fi: 'Kirkkonummen kunnanvaltuutettu (Vihreät) ja johtava ohjelmistokehittäjä. Keskittyy talouteen, yrittäjyyteen, digitaaliseen itsenäisyyteen ja vastuulliseen tekoälypolitiikkaan. Seuraa eduskuntavaaleja.',
    sv: 'Kommunfullmäktigeledamot i Kyrkslätt (De Gröna) och ledande mjukvarutvecklare. Fokuserar på ekonomi, företagande, digital självständighet och ansvarsfull AI-politik. Följer riksdagsvalen.',
}

export const personKnowsAbout: Record<Lang, string[]> = {
    en: [
        'Economic policy',
        'Entrepreneurship',
        'Innovation policy',
        'Digital independence',
        'Digital sovereignty',
        'Artificial intelligence',
        'Responsible AI',
        'Green transition',
        'Parliamentary elections',
    ],
    fi: [
        'Talouspolitiikka',
        'Yrittäjyys',
        'Innovaatiopolitiikka',
        'Digitaalinen itsenäisyys',
        'Digitaalinen riippumattomuus',
        'Tekoäly',
        'Vastuullinen tekoäly',
        'Vihreä siirtymä',
        'Eduskuntavaalit',
    ],
    sv: [
        'Ekonomisk politik',
        'Företagande',
        'Innovationspolitik',
        'Digital självständighet',
        'Digitalt oberoende',
        'Artificiell intelligens',
        'Ansvarsfull AI',
        'Grön omställning',
        'Riksdagsval',
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
            skills: 'Digitaalinen politiikka, tekoälyhallinto, talouspolitiikka, yrittäjyys, kunnallishallinto',
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
            name: 'Ledande mjukvarutvecklare',
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
          place?: string
      }
