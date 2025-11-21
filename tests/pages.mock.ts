import type { ContentfulPage } from '../src/types/contentful'

import { contactInfoLinks } from './contactInfo.mock'
import {
    inFrontOfWoodsImage,
    inFrontOfWoodsImageDescription,
    smilingImage,
    smilingImageDescription,
} from './images.mock'

const image = {
    description: inFrontOfWoodsImageDescription,
    gatsbyImageData: inFrontOfWoodsImage,
}

const images = {
    backgroundImage: { description: smilingImageDescription, gatsbyImageData: smilingImage },
    image,
    socialImage: { gatsbyImageData: smilingImage },
}

export const frontPage: ContentfulPage = {
    backgroundImage: image,
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Lyhyesti","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummelainen politiikasta kiinnostunut diplomi-insinööri. Vihreiden luottamushenkilö (entisen perusturvajaoston jäsen, suomenkielisen kasvatus- ja koulutuslautakunnan varajäsen), ohjelmistokehittäjä ja kolmen lapsen isä.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Uusimmat kirjoitukset","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[],"nodeType":"hr"},{"data":{"target":{"sys":{"id":"6kFlEZ2Nv6UXotMJJNIFGm","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulExcerptList',
                contentful_id: '6kFlEZ2Nv6UXotMJJNIFGm',
                limit: 3,
            },
        ],
    },
    description: 'Kotisivuni.',
    image,
    jsonLdType: 'WebSite',
    secondaryTitle: 'Ohjelmistoja, yksityisyydensuojaa ja politiikkaa',
    slug: 'index',
    socialImage: {
        gatsbyImageData: smilingImage,
    },
    subtitle: 'DI, Lead Developer ja kunnanvaltuutettu',
    title: 'Lauri Lavanti',
    updatedAt: '2023-05-24T14:51:46.661Z',
}

export const aboutMe: ContentfulPage = {
    ...images,
    body: {
        raw: '{"nodeType":"document","data":{},"content":[{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Olen ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"fvxZI2eLzqnwfebd6CPUO","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"-vuotias diplomi-insinööri, Vihreiden luottamushenkilö ja kolmen pienen lapsen isä Kirkkonummelta. Politiikassa minulle tärkeimpiä asioita ovat lasten ja nuorten hyvinvointi, oikeudenmukaisuus, tasa-arvo, demokratia ja kestävä toiminta niin luonnon kuin taloudenkin kannalta. Päivätyöni on toimia ohjelmistokehitystiimin esihenkilönä ja ohjelmiston arkkitehtuurin suunnittelijana, huolehtien osaltani yrityksen kehityksen kestävästä suunnasta. ","marks":[],"data":{}},{"nodeType":"text","value":"Alapuolelta voit lukea tarkemman listauksen erinäisistä luottamustoimistani ja työhistoriastani","marks":[],"data":{}},{"nodeType":"text","value":".","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Pyrin kirjoittamaan täällä aiheista, jotka koskettavat erityisesti Kirkkonummea tai vaativat muuten pidempää pureskelua. Valtakunnan politiikasta ja ajatuksistani muutenkin kirjoitan aktiivisesti myös ","marks":[],"data":{}},{"nodeType":"hyperlink","data":{"uri":"https://bsky.app/profile/laurilavanti.fi"},"content":[{"nodeType":"text","value":"Blueskyssa","marks":[],"data":{}}]},{"nodeType":"text","value":" ja ","marks":[],"data":{}},{"nodeType":"hyperlink","data":{"uri":"https://www.threads.net/@laurilavanti"},"content":[{"nodeType":"text","value":"Threadsissä","marks":[],"data":{}}]},{"nodeType":"text","value":".","marks":[],"data":{}}]},{"nodeType":"embedded-entry-block","data":{"target":{"sys":{"id":"69ER5TaS3Gi3EG0xwHPOLv","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"","marks":[],"data":{}}]}]}',
        references: [
            {
                __typename: 'ContentfulCurriculumVitae',
                contentful_id: '69ER5TaS3Gi3EG0xwHPOLv',
                degrees: [
                    {
                        degree: 'Diplomi-insinööri (informaatioverkostot)',
                        endYear: 2018,
                        location: 'Espoo',
                        school: 'Aalto-yliopisto',
                        startYear: 2012,
                    },
                    {
                        degree: 'Datanomi',
                        endYear: 2011,
                        location: 'Kirkkonummi',
                        school: 'Omnia ammattiopisto',
                        startYear: 2007,
                    },
                    {
                        degree: 'Ylioppilas',
                        endYear: 2011,
                        location: 'Kirkkonummi',
                        school: 'Masalan lukio',
                        startYear: 2007,
                    },
                ],
                degreesTitle: 'Koulutus',
                fiduciaries: [
                    {
                        duty: 'Toimitilapalvelujen lautakunnan varajäsen',
                        organization: 'Kirkkonummen kunta',
                        startYear: 2023,
                    },
                    {
                        duty: 'Hallituksen varajäsen',
                        organization: 'Kirkkonummen Vihreät',
                        startYear: 2023,
                    },
                    {
                        duty: 'Länsi-Uudenmaan pelastuslaitos -liikelaitoksen johtokunnan varajäsen',
                        organization: 'Länsi-Uudenmaan hyvinvointialue',
                        startYear: 2022,
                    },
                    {
                        duty: 'Suomenkielisen kasvatus- ja koulutuslautakunnan varajäsen',
                        organization: 'Kirkkonummen kunta',
                        startYear: 2021,
                    },
                    {
                        duty: 'Perusturvajaoston jäsen',
                        endYear: 2022,
                        organization: 'Kirkkonummen kunta',
                        startYear: 2021,
                    },
                    {
                        duty: 'KV-kapteeni',
                        endYear: 2015,
                        organization: 'Informaatioverkostojen kilta Athene',
                        startYear: 2015,
                    },
                    {
                        duty: 'Hallituksen puheenjohtaja',
                        endYear: 2015,
                        organization: 'Aalto Predators',
                        startYear: 2014,
                    },
                    {
                        duty: 'Hallituksen jäsen',
                        endYear: 2013,
                        organization: 'Aalto Predators',
                        startYear: 2013,
                    },
                    {
                        duty: 'Nuorisovaltuuston hallituksen puheenjohtaja',
                        endYear: 2010,
                        organization: 'Kirkkonummen kunta',
                        startYear: 2010,
                    },
                ],
                fiduciariesTitle: 'Luottamustoimet',
                jobExperiences: [
                    {
                        company: 'Verkkokauppa.com',
                        location: 'Helsinki',
                        startYear: 2022,
                        title: 'Team Lead',
                    },
                    {
                        company: 'Verkkokauppa.com',
                        endYear: 2022,
                        location: 'Helsinki',
                        startYear: 2019,
                        title: 'Software developer',
                    },
                    {
                        company: 'Gofore',
                        endYear: 2019,
                        location: 'Helsinki',
                        startYear: 2018,
                        title: 'Software developer',
                    },
                    {
                        company: 'Zalando',
                        endYear: 2018,
                        location: 'Helsinki',
                        startYear: 2017,
                        title: 'Software engineer',
                    },
                    {
                        company: 'Futurice',
                        endYear: 2017,
                        location: 'Helsinki',
                        startYear: 2015,
                        title: 'Software developer',
                    },
                    {
                        company: 'Pulmaton Solutions Oy',
                        endYear: 2014,
                        location: 'Helsinki',
                        startYear: 2014,
                        title: 'Software developer',
                    },
                    {
                        company: 'Nokia Solutions & Networks',
                        endYear: 2013,
                        location: 'Espoo',
                        startYear: 2013,
                        title: 'Seasonal trainee',
                    },
                ],
                jobExperiencesTitle: 'Työkokemus',
            },
        ],
    },
    description:
        'Olen ikäni Kirkkonummella asunut 29-vuotias isä, ohjelmistokehittäjä ja diplomi-insinööri. Haluan huolehtia siitä, että lapsilla ja nuorilla on hyvä kasvuympäristö ja valoisa tulevaisuus.',
    jsonLdType: 'Person',
    secondaryTitle: null,
    slug: 'minusta',
    subtitle: null,
    title: 'Minusta',
    updatedAt: '2023-10-17T03:58:48.870Z',
}

export const blog: ContentfulPage = {
    ...images,
    body: {
        raw: '{"data":{},"content":[{"data":{"target":{"sys":{"id":"2xbkM6orHOjGAeP19QeSoW","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulExcerptList',
                contentful_id: '2xbkM6orHOjGAeP19QeSoW',
            },
        ],
    },
    description: 'Blogitekstejä',
    jsonLdType: 'WebPage',
    secondaryTitle: null,
    slug: 'blogi',
    subtitle: null,
    title: 'Blogi',
    updatedAt: '2022-07-31T20:26:27.574Z',
}

export const contactMe: ContentfulPage = {
    ...images,
    body: {
        raw: '{"nodeType":"document","data":{},"content":[{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Sähköposti: ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"4N9FJRjt9I5wHNGDWjp3Ox","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Facebook: ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"6ylApa8B8wgGibypB2UIB9","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Bluesky: ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"huwFXuirHu64btphW6KuN","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Threads: ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"25USXEVEz9KLBF6JMtgVsx","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Instagram: ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"o7sDXDUNJVK7NUQSQarQQ","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"LinkedIn: ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"vl12ZwQDYvDaOBWKlWU09","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Mastodon: ","marks":[],"data":{}},{"nodeType":"embedded-entry-inline","data":{"target":{"sys":{"id":"2uZGyVH5uV3hzs4fjd685d","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"text","value":"","marks":[],"data":{}}]}]}',
        references: contactInfoLinks.map((link) => ({ ...link, __typename: 'ContentfulContactInfoLink' })),
    },
    description: 'Yhteystiedot',
    jsonLdType: 'Person',
    secondaryTitle: null,
    slug: 'ota-yhteytta',
    subtitle: null,
    title: 'Ota yhteyttä',
    updatedAt: '2022-07-31T20:25:55.535Z',
}
