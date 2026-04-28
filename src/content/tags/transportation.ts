import type { LocalTag } from './types'

export const transportationTag: LocalTag = {
    descriptions: {
        en: 'Posts about transport, public transit, and sustain\u00ADable mobility.',
        fi: 'Kirjoituksia liikenteestä, joukkoliikenteestä ja kestävästä liikkumisesta.',
        sv: 'Texter om trafik, kollektivtrafik och hållbar rörlighet.',
    },
    faq: {
        en: [
            {
                a: 'Sustainable transport reduces car dependency through better public transit, cycling infrastructure, and land use planning that places services close to where people live.',
                q: 'What is sustainable transport?',
            },
            {
                a: 'Public transit improvements, cycling routes, and pedestrian paths reduce emissions, improve health outcomes, and make areas more accessible for those without cars.',
                q: 'Why invest in public transit and cycling?',
            },
        ],
        fi: [
            {
                a: 'Kestävä liikenne vähentää autoilua parantamalla joukkoliikennettä, pyöräilyinfrastruktuuria ja maankäyttöä siten, että palvelut ovat lähellä ihmisten arkea.',
                q: 'Mitä kestävä liikenne tarkoittaa?',
            },
            {
                a: 'Joukkoliikenteen, pyöräilyreittien ja kävelyväylien kehittäminen vähentää päästöjä, parantaa terveyttä ja tekee alueista saavutettavampia autottomille.',
                q: 'Miksi joukkoliikenteeseen ja pyöräilyyn kannattaa investoida?',
            },
        ],
        sv: [
            {
                a: 'Hållbar trafik minskar bilberoendet genom bättre kollektivtrafik, cykelinfrastruktur och markanvändning som placerar tjänster nära där människor bor.',
                q: 'Vad innebär hållbar trafik?',
            },
            {
                a: 'Satsningar på kollektivtrafik, cykelvägar och gångstråk minskar utsläpp, förbättrar hälsan och gör områden mer tillgängliga för dem utan bil.',
                q: 'Varför investera i kollektivtrafik och cykling?',
            },
        ],
    },
    id: 'transportation',
    names: { en: 'Transport', fi: 'Liikenne', sv: 'Trafik' },
    pageTitle: {
        en: 'Transport – public transit and sustain\u00ADable mobility',
        fi: 'Liikenne – joukko\u00ADliikenne ja kestävä liikku\u00ADminen',
        sv: 'Trafik – kollektiv\u00ADtrafik och hållbar rörlighet',
    },
}
