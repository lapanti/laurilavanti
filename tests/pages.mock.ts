import type { ContentfulPage } from '../src/types/contentful'

import { contactInfoLinks } from './contactInfo.mock'
import { mainImage, mainImageDescription } from './images.mock'

const image = {
    localFile: mainImage,
    description: mainImageDescription,
}

const images = {
    image,
    mobileImage: image,
}

export const frontPage: ContentfulPage = {
    ...images,
    description: null,
    hideTitle: true,
    jsonLdType: 'WebSite',
    title: 'Lauri Lavanti',
    body: {
        raw: '{"data":{},"content":[{"data":{"target":{"sys":{"id":"3uieCAj8exvxEHG0mxndMV","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"Lyhyesti","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummelainen politiikasta kiinnostunut diplomi-insinööri. Vihreiden luottamushenkilö (entisen perusturvajaoston jäsen, suomenkielisen kasvatus- ja koulutuslautakunnan varajäsen), ohjelmistokehittäjä ja kolmen lapsen isä.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Uusimmat kirjoitukset","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[],"nodeType":"hr"},{"data":{"target":{"sys":{"id":"6kFlEZ2Nv6UXotMJJNIFGm","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulHomeTitle',
                contentful_id: '3uieCAj8exvxEHG0mxndMV',
            },
            {
                __typename: 'ContentfulExcerptList',
                contentful_id: '6kFlEZ2Nv6UXotMJJNIFGm',
                limit: 3,
            },
        ],
    },
    updatedAt: '2023-05-24T14:51:46.661Z',
}

export const aboutMe: ContentfulPage = {
    ...images,
    description:
        'Olen ikäni Kirkkonummella asunut 29-vuotias isä, ohjelmistokehittäjä ja diplomi-insinööri. Haluan huolehtia siitä, että lapsilla ja nuorilla on hyvä kasvuympäristö ja valoisa tulevaisuus.',
    hideTitle: false,
    jsonLdType: 'Person',
    title: 'Minusta',
    body: {
        raw: '{"nodeType":"document","data":{},"content":[{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Olen 32-vuotias isä, esihenkilö, ohjelmistokehittäjä ja diplomi-insinööri Kirkkonummelta.","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Ensimmäinen luottamustoimeni oli, kun minut valittiin edustamaan Masalan lukiota Kirkkonummen kunnan nuorisovaltuustoon vuonna 2010. Nuorisovaltuustossa toimin sen hallituksen puheenjohtajana. Kunnan antaman budjetin päätimme valtuustossa käyttää Kirkkonummella yhä käytössä olevaan graffitiseinään. Byrokratiaan ja paikan valintaan meni lähes koko vuosi, vaikka pohjatöitä oli jo edellisten nuorisovaltuustojen toimesta tehty. Lopulta kuitenkin löydettiin graffitiseinälle paikka Varuboden Areenan vierestä, joka kelpasi sekä kunnalle että asukkaille.","marks":[],"data":{}}]},{"nodeType":"embedded-entry-block","data":{"target":{"sys":{"id":"6cya8rbqyJVA8DQlwSIWm8","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Yliopistossa toimin kolme vuotta vasta perustetun amerikkalaisen jalkapallojoukkueen Aalto Predatorsin hallituksessa, joista kaksi jälkimmäistä joukkueen puheenjohtajana. Näiden ensimmäisten vuosien toimme urheiluun sopivan verran urheilujuhlan tuntua, järjestämällä ottelumme Otaniemen perinteikkäässä Otahallissa, live-striimauksineen ja selostuksineen. Viimeisenä aktiivi-vuotenani toimin myös kiltani (Otaniemen teekkarien vastine ainejärjestölle) hallituksessa vastaten ulkomaalaisista opiskelijoistamme.","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"Sen jälkeen työelämä veikin minut mukanaan, kunnes 2021 päätin asettua kuntavaaleissa Vihreiden ehdokkaaksi. Kirkkonummella tärkeimpänä näin lapsiperheistä ja nuorista huolehtimisen. Vaikka en kunnanvaltuustoon päässytkään, sain varajäsenyyden Suomenkieliseen varhaiskasvatus- ja koulutuslautakuntaan sekä varsinaisen jäsenyyden Perusturvajaokseen.","marks":[],"data":{}}]},{"nodeType":"embedded-entry-block","data":{"target":{"sys":{"id":"69ER5TaS3Gi3EG0xwHPOLv","type":"Link","linkType":"Entry"}}},"content":[]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"","marks":[],"data":{}}]}]}',
        references: [
            {
                __typename: 'ContentfulImageWithCaption',
                contentful_id: '6cya8rbqyJVA8DQlwSIWm8',
                altText: 'Kirkkonummen graffitiseinä ja Varuboden Areena',
                image: {
                    localFile: {
                        childImageSharp: {
                            gatsbyImageData: {
                                layout: 'constrained',
                                placeholder: {
                                    fallback:
                                        'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEAQL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABqZ3pOPE//8QAGhAAAgIDAAAAAAAAAAAAAAAAAQIAEhMgI//aAAgBAQABBQLI5NnnbT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAZEAABBQAAAAAAAAAAAAAAAAAAASAyM0L/2gAIAQEABj8CrUgZZ//EABkQAAIDAQAAAAAAAAAAAAAAAAERACBRcf/aAAgBAQABPyEh0BR+OqE4Cn//2gAMAwEAAgADAAAAELP/AP/EABURAQEAAAAAAAAAAAAAAAAAABAR/9oACAEDAQE/EKf/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAgEBPxCI/8QAHRABAAICAgMAAAAAAAAAAAAAAQARITEQQVGRof/aAAgBAQABPxCkJa2pT7gfRX2w+xCoDxjEN8O5/9k=',
                                },
                                images: {
                                    fallback: {
                                        src: '/static/fd6136fc5d20d3649c71061c51f24dfe/f7471/kirkkonummen-graffitiseina.jpg',
                                        srcSet: '/static/fd6136fc5d20d3649c71061c51f24dfe/95548/kirkkonummen-graffitiseina.jpg 455w,\n/static/fd6136fc5d20d3649c71061c51f24dfe/e6bdc/kirkkonummen-graffitiseina.jpg 910w,\n/static/fd6136fc5d20d3649c71061c51f24dfe/f7471/kirkkonummen-graffitiseina.jpg 1820w',
                                        sizes: '(min-width: 1820px) 1820px, 100vw',
                                    },
                                    sources: [
                                        {
                                            srcSet: '/static/fd6136fc5d20d3649c71061c51f24dfe/7bfa3/kirkkonummen-graffitiseina.webp 455w,\n/static/fd6136fc5d20d3649c71061c51f24dfe/d32f3/kirkkonummen-graffitiseina.webp 910w,\n/static/fd6136fc5d20d3649c71061c51f24dfe/9e6d8/kirkkonummen-graffitiseina.webp 1820w',
                                            type: 'image/webp',
                                            sizes: '(min-width: 1820px) 1820px, 100vw',
                                        },
                                    ],
                                },
                                width: 1820,
                                height: 780,
                            },
                        },
                    },
                    description: 'Kuva Kirkkonummen graffitiseinästä.',
                },
                caption: 'Kirkkonummen graffitiseinä',
            },
            {
                __typename: 'ContentfulCurriculumVitae',
                contentful_id: '69ER5TaS3Gi3EG0xwHPOLv',
                fiduciariesTitle: 'Luottamustoimet',
                fiduciaries: [
                    {
                        duty: 'Toimitilapalvelujen lautakunnan varajäsen',
                        organization: 'Kirkkonummen kunta',
                        startYear: 2023,
                        endYear: null,
                    },
                    {
                        duty: 'Hallituksen varajäsen',
                        organization: 'Kirkkonummen Vihreät',
                        startYear: 2023,
                        endYear: null,
                    },
                    {
                        duty: 'Länsi-Uudenmaan pelastuslaitos -liikelaitoksen johtokunnan varajäsen',
                        organization: 'Länsi-Uudenmaan hyvinvointialue',
                        startYear: 2022,
                        endYear: null,
                    },
                    {
                        duty: 'Suomenkielisen kasvatus- ja koulutuslautakunnan varajäsen',
                        organization: 'Kirkkonummen kunta',
                        startYear: 2021,
                        endYear: null,
                    },
                    {
                        duty: 'Perusturvajaoston jäsen',
                        organization: 'Kirkkonummen kunta',
                        startYear: 2021,
                        endYear: 2022,
                    },
                    {
                        duty: 'KV-kapteeni',
                        organization: 'Informaatioverkostojen kilta Athene',
                        startYear: 2015,
                        endYear: 2015,
                    },
                    {
                        duty: 'Hallituksen puheenjohtaja',
                        organization: 'Aalto Predators',
                        startYear: 2014,
                        endYear: 2015,
                    },
                    {
                        duty: 'Hallituksen jäsen',
                        organization: 'Aalto Predators',
                        startYear: 2013,
                        endYear: 2013,
                    },
                    {
                        duty: 'Nuorisovaltuuston hallituksen puheenjohtaja',
                        organization: 'Kirkkonummen kunta',
                        startYear: 2010,
                        endYear: 2010,
                    },
                ],
                degreesTitle: 'Koulutus',
                degrees: [
                    {
                        degree: 'Diplomi-insinööri (informaatioverkostot)',
                        school: 'Aalto-yliopisto',
                        location: 'Espoo',
                        startYear: 2012,
                        endYear: 2018,
                    },
                    {
                        degree: 'Datanomi',
                        school: 'Omnia ammattiopisto',
                        location: 'Kirkkonummi',
                        startYear: 2007,
                        endYear: 2011,
                    },
                    {
                        degree: 'Ylioppilas',
                        school: 'Masalan lukio',
                        location: 'Kirkkonummi',
                        startYear: 2007,
                        endYear: 2011,
                    },
                ],
                jobExperiencesTitle: 'Työkokemus',
                jobExperiences: [
                    {
                        title: 'Team Lead',
                        company: 'Verkkokauppa.com',
                        location: 'Helsinki',
                        startYear: 2022,
                        endYear: null,
                    },
                    {
                        title: 'Software developer',
                        company: 'Verkkokauppa.com',
                        location: 'Helsinki',
                        startYear: 2019,
                        endYear: 2022,
                    },
                    {
                        title: 'Software developer',
                        company: 'Gofore',
                        location: 'Helsinki',
                        startYear: 2018,
                        endYear: 2019,
                    },
                    {
                        title: 'Software engineer',
                        company: 'Zalando',
                        location: 'Helsinki',
                        startYear: 2017,
                        endYear: 2018,
                    },
                    {
                        title: 'Software developer',
                        company: 'Futurice',
                        location: 'Helsinki',
                        startYear: 2015,
                        endYear: 2017,
                    },
                    {
                        title: 'Software developer',
                        company: 'Pulmaton Solutions Oy',
                        location: 'Helsinki',
                        startYear: 2014,
                        endYear: 2014,
                    },
                    {
                        title: 'Seasonal trainee',
                        company: 'Nokia Solutions & Networks',
                        location: 'Espoo',
                        startYear: 2013,
                        endYear: 2013,
                    },
                ],
            },
        ],
    },
    updatedAt: '2023-10-17T03:58:48.870Z',
}

export const blog: ContentfulPage = {
    ...images,
    description: null,
    hideTitle: false,
    jsonLdType: 'WebPage',
    title: 'Blogi',
    body: {
        raw: '{"data":{},"content":[{"data":{"target":{"sys":{"id":"2xbkM6orHOjGAeP19QeSoW","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulExcerptList',
                contentful_id: '2xbkM6orHOjGAeP19QeSoW',
            },
        ],
    },
    updatedAt: '2022-07-31T20:26:27.574Z',
}

export const contactMe: ContentfulPage = {
    ...images,
    description: 'Yhteystiedot',
    hideTitle: false,
    jsonLdType: 'Person',
    title: 'Ota yhteyttä',
    body: {
        raw: '{"data":{},"content":[{"data":{"target":{"sys":{"id":"5p1Xu3HEt01ELvRawwh6HF","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulContactInfo',
                contentful_id: '5p1Xu3HEt01ELvRawwh6HF',
                links: contactInfoLinks,
            },
        ],
    },
    updatedAt: '2022-07-31T20:25:55.535Z',
}
