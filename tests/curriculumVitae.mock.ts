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
]

export const jobExperiencesTitle: string = 'Työkokemus'

export const jobExperiences: JobExperience[] = [
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
]
