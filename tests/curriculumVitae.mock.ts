import type { Degree, Fiduciary, JobExperience } from '../src/types/contentful'

export const degreesTitle: string = 'Koulutus'

export const degrees: Degree[] = [
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
]

export const fiduciariesTitle: string = 'Luottamustoimet'

export const fiduciaries: Fiduciary[] = [
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
]

export const jobExperiencesTitle: string = 'Työkokemus'

export const jobExperiences: JobExperience[] = [
    {
        startYear: 2022,
        title: 'Team Lead',
        company: 'Verkkokauppa.com',
        location: 'Helsinki',
    },
    {
        endYear: 2022,
        startYear: 2019,
        title: 'Software developer',
        company: 'Verkkokauppa.com',
        location: 'Helsinki',
    },
    {
        endYear: 2019,
        startYear: 2018,
        title: 'Software developer',
        company: 'Gofore',
        location: 'Helsinki',
    },
    {
        endYear: 2018,
        startYear: 2017,
        title: 'Software engineer',
        company: 'Zalando',
        location: 'Helsinki',
    },
    {
        endYear: 2017,
        startYear: 2015,
        title: 'Software developer',
        company: 'Futurice',
        location: 'Helsinki',
    },
    {
        endYear: 2014,
        startYear: 2014,
        title: 'Software developer',
        company: 'Pulmaton Solutions Oy',
        location: 'Helsinki',
    },
    {
        endYear: 2013,
        startYear: 2013,
        title: 'Seasonal trainee',
        company: 'Nokia Solutions & Networks',
        location: 'Espoo',
    },
]
