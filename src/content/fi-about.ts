import type { CurriculumVitae } from '../types/contentful'

export const pageTitle = 'Teknologian ja yhteiskunnan rajapinnassa'
export const pageDescription =
    'Olen johtava ohjelmistokehittäjä, diplomi-insinööri ja poliitikko. Työskentelen siellä, missä teknologia muuttaa yhteiskuntaa – ja missä päätöksenteon pitäisi pysyä mukana'

export const summaryBoxData = {
    ariaLabel: 'Faktoja Laurista',
    summaryRows: [
        'Lauri toimii johtavana ohjelmistokehittäjänä pankissa.',
        'Lauri on valmistunut diplomi-insinööriksi informaatioverkostojen koulutusohjelmasta Aalto-yliopistosta.',
        'Lauri on kunnanvaltuutettu Kirkkonummella.',
        'Lauri on Vihreän valtuustoryhmän puheenjohtaja.',
        'Laurilla on neljä lasta, kolme tytärtä ja yksi poika.',
        'Teemat, joihin Lauri keskittyy politiikassa ja työelämässä ovat digitalisaatio, yksityisyyden suoja sekä tekoälyn vastuullinen käyttöönotto.',
    ],
    title: 'Lauri lyhyesti',
}

export const cvFiduciariesTitle = 'Luottamustoimet'
export const cvFiduciaries = [
    {
        fields: {
            duty: 'Kunnanvaltuutettu',
            internalName: 'Kunnanvaltuutettu Kirkkonummen kunta 2025',
            organization: 'Kirkkonummen kunta',
            startYear: 2025,
        },
    },
    {
        fields: {
            duty: 'Vihreän valtuustoryhmän puheenjohtaja',
            internalName: 'Vihreän valtuustoryhmän puheenjohtaja Kirkkonummen kunta 2025',
            organization: 'Kirkkonummen kunta',
            startYear: 2025,
        },
    },
    {
        fields: {
            duty: 'Kuntakehityslautakunnan jäsen',
            internalName: 'Kuntakehityslautakunnan jäsen Kirkkonummen kunta 2025',
            organization: 'Kirkkonummen kunta',
            startYear: 2025,
        },
    },
    {
        fields: {
            duty: 'Puheenjohtaja',
            endYear: 2025,
            internalName: 'Puheenjohtaja Kirkkonummen Vihreät 2025',
            organization: 'Kirkkonummen Vihreät',
            startYear: 2025,
        },
    },
    {
        fields: {
            duty: 'Toimitilapalvelujen lautakunnan varajäsen',
            endYear: 2025,
            internalName: 'Toimitilapalvelujen lautakunnan varajäsen Kirkkonummen kunta 2023',
            organization: 'Kirkkonummen kunta',
            startYear: 2023,
        },
    },
    {
        fields: {
            duty: 'Hallituksen varajäsen',
            endYear: 2024,
            internalName: 'Hallituksen varajäsen Kirkkonummen Vihreät 2023',
            organization: 'Kirkkonummen Vihreät',
            startYear: 2023,
        },
    },
    {
        fields: {
            duty: 'Länsi-Uudenmaan pelastuslaitos -liikelaitoksen johtokunnan varajäsen',
            endYear: 2025,
            internalName: 'Länsi-Uudenmaan pelastuslaitos johtokunnan varajäsen 2022',
            organization: 'Länsi-Uudenmaan hyvinvointialue',
            startYear: 2022,
        },
    },
    {
        fields: {
            duty: 'Suomenkielisen kasvatus- ja koulutuslautakunnan varajäsen',
            endYear: 2025,
            internalName: 'Suomenkielisen kasvatus- ja koulutuslautakunnan varajäsen 2021',
            organization: 'Kirkkonummen kunta',
            startYear: 2021,
        },
    },
    {
        fields: {
            duty: 'Perusturvajaoston jäsen',
            endYear: 2022,
            internalName: 'Perusturvajaoston jäsen Kirkkonummen kunta 2021',
            organization: 'Kirkkonummen kunta',
            startYear: 2021,
        },
    },
    {
        fields: {
            duty: 'KV-kapteeni',
            endYear: 2015,
            internalName: 'KV-kapteeni Informaatioverkostojen kilta Athene 2015',
            organization: 'Informaatioverkostojen kilta Athene',
            startYear: 2015,
        },
    },
    {
        fields: {
            duty: 'Hallituksen puheenjohtaja',
            endYear: 2015,
            internalName: 'Hallituksen puheenjohtaja Aalto Predators 2014',
            organization: 'Aalto Predators',
            startYear: 2014,
        },
    },
    {
        fields: {
            duty: 'Hallituksen jäsen',
            endYear: 2013,
            internalName: 'Hallituksen jäsen Aalto Predators 2013',
            organization: 'Aalto Predators',
            startYear: 2013,
        },
    },
    {
        fields: {
            duty: 'Nuorisovaltuuston hallituksen puheenjohtaja',
            endYear: 2010,
            internalName: 'Nuorisovaltuuston hallituksen puheenjohtaja Kirkkonummen kunta 2010',
            organization: 'Kirkkonummen kunta',
            startYear: 2010,
        },
    },
] as unknown as CurriculumVitae['fields']['fiduciaries']

export const cvJobExperiencesTitle = 'Työkokemus'
export const cvJobExperiences = [
    {
        fields: {
            company: 'OP',
            internalName: 'Lead developer OP 2024',
            location: 'Helsinki',
            startYear: 2024,
            title: 'Lead developer',
        },
    },
    {
        fields: {
            company: 'Verkkokauppa.com',
            endYear: 2024,
            internalName: 'Team Lead Verkkokauppa.com 2022',
            location: 'Helsinki',
            startYear: 2022,
            title: 'Team Lead',
        },
    },
    {
        fields: {
            company: 'Verkkokauppa.com',
            endYear: 2022,
            internalName: 'Software developer Verkkokauppa.com 2019',
            location: 'Helsinki',
            startYear: 2019,
            title: 'Software developer',
        },
    },
    {
        fields: {
            company: 'Gofore',
            endYear: 2019,
            internalName: 'Software developer Gofore 2018',
            location: 'Helsinki',
            startYear: 2018,
            title: 'Software developer',
        },
    },
    {
        fields: {
            company: 'Zalando',
            endYear: 2018,
            internalName: 'Software engineer Zalando 2017',
            location: 'Helsinki',
            startYear: 2017,
            title: 'Software engineer',
        },
    },
    {
        fields: {
            company: 'Futurice',
            endYear: 2017,
            internalName: 'Software developer Futurice 2015',
            location: 'Helsinki',
            startYear: 2015,
            title: 'Software developer',
        },
    },
    {
        fields: {
            company: 'Pulmaton Solutions Oy',
            endYear: 2014,
            internalName: 'Software developer Pulmaton Solutions Oy 2014',
            location: 'Helsinki',
            startYear: 2014,
            title: 'Software developer',
        },
    },
    {
        fields: {
            company: 'Nokia Solutions & Networks',
            endYear: 2013,
            internalName: 'Seasonal trainee Nokia Solutions Networks 2013',
            location: 'Espoo',
            startYear: 2013,
            title: 'Seasonal trainee',
        },
    },
] as unknown as CurriculumVitae['fields']['jobExperiences']

export const cvDegreesTitle = 'Koulutus'
export const cvDegrees = [
    {
        fields: {
            degree: 'Diplomi-insinööri (informaatioverkostot)',
            endYear: 2018,
            internalName: 'Diplomi-insinööri Aalto-yliopisto 2012',
            location: 'Espoo',
            school: 'Aalto-yliopisto',
            startYear: 2012,
        },
    },
    {
        fields: {
            degree: 'Datanomi',
            endYear: 2011,
            internalName: 'Datanomi Omnia ammattiopisto 2007',
            location: 'Kirkkonummi',
            school: 'Omnia ammattiopisto',
            startYear: 2007,
        },
    },
    {
        fields: {
            degree: 'Ylioppilas',
            endYear: 2011,
            internalName: 'Ylioppilas Masalan lukio 2007',
            location: 'Kirkkonummi',
            school: 'Masalan lukio',
            startYear: 2007,
        },
    },
] as unknown as CurriculumVitae['fields']['degrees']
