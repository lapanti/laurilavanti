import type { Lang } from './nav'

interface CampaignEventLocale {
    /** One or two factual sentences — the card body. */
    description: string
    /** Municipality in this language; also the schema.org addressLocality. */
    locality: string
    /** The card heading, and the schema.org `name` once the topic is confirmed. */
    title: string
    /** Venue as written for readers in this language; also the schema.org Place name. */
    venue: string
}

export interface CampaignEvent {
    /** Calendar date in Europe/Helsinki, YYYY-MM-DD — sorted and compared as a plain string. */
    date: string
    /** 'HH:MM', omitted together with startTime while the schedule is open. */
    endTime?: string
    /** Stable key for the rendered list, and the marker the nightly expiry check greps for. */
    id: string
    locales: Record<Lang, CampaignEventLocale>
    postalCode: string
    /** 'HH:MM' local time. Omitted until the time is agreed; the card then shows the date alone. */
    startTime?: string
    /**
     * Finnish street name in every locale: it is the form Posti routes on, and it
     * appears only in structured data, never on the page. Move into the locale object
     * if the Swedish street forms are ever wanted in the sv JSON-LD.
     */
    streetAddress: string
    /**
     * False while the subject of the event is still open: the card shows a
     * topic-pending line, and Head leaves the event out of the Event JSON-LD —
     * structured data should not announce a programme that does not exist yet.
     */
    topicConfirmed: boolean
}

/**
 * Campaign events, soonest first — the order they render in.
 *
 * Events whose date has passed are dropped at build time (see filterUpcoming in
 * src/lib/events.ts), and the nightly scheduled-publish workflow redeploys the site
 * so the removal actually reaches production.
 */
export const campaignEvents: CampaignEvent[] = [
    {
        date: '2026-09-19',
        endTime: '17:00',
        id: 'kampanjatiimin-aloitus',
        locales: {
            en: {
                description:
                    'The campaign team meets for the first time. We go through the themes and the schedule for the election spring and agree on who does what. Anyone who wants to take part is welcome.',
                locality: 'Espoo',
                title: 'Campaign team kickoff',
                venue: 'Iso Omena shopping centre',
            },
            fi: {
                description:
                    'Kampanjatiimi kokoontuu ensimmäistä kertaa. Käymme läpi vaalikevään teemat ja aikataulun sekä sovimme, kuka tekee mitä. Tervetuloa mukaan, jos haluat olla rakentamassa kampanjaa.',
                locality: 'Espoo',
                title: 'Kampanjatiimin aloitustilaisuus',
                venue: 'Kauppakeskus Iso Omena',
            },
            sv: {
                description:
                    'Kampanjteamet träffas för första gången. Vi går igenom valvårens teman och tidtabell och kommer överens om vem som gör vad. Välkommen med om du vill vara med och bygga kampanjen.',
                locality: 'Esbo',
                title: 'Kampanjteamets första träff',
                venue: 'Köpcentret Iso Omena',
            },
        },
        postalCode: '02230',
        startTime: '15:00',
        streetAddress: 'Piispansilta 11',
        topicConfirmed: true,
    },
    {
        date: '2026-11-30',
        id: 'fyyri-morne',
        locales: {
            en: {
                description:
                    'A campaign event in the Mörne hall at Fyyri, the main library of Kirkkonummi. Open to all and free of charge.',
                locality: 'Kirkkonummi',
                title: 'Event at Fyyri library',
                venue: 'Fyyri library, Mörne hall',
            },
            fi: {
                description:
                    'Kampanjan tilaisuus Kirkkonummen pääkirjaston Fyyrin Mörne-salissa. Tilaisuus on avoin ja maksuton.',
                locality: 'Kirkkonummi',
                title: 'Tapahtuma kirjastotalo Fyyrissä',
                venue: 'Kirjastotalo Fyyri, Mörne-sali',
            },
            sv: {
                description:
                    'Kampanjens evenemang i Mörnesalen i Kyrkslätts huvudbibliotek Fyyri. Tillställningen är öppen och avgiftsfri.',
                locality: 'Kyrkslätt',
                title: 'Evenemang i bibliotekshuset Fyyri',
                venue: 'Bibliotekshuset Fyyri, Mörnesalen',
            },
        },
        postalCode: '02400',
        streetAddress: 'Kirkkotori 1',
        topicConfirmed: false,
    },
]
