import type { GatsbyConfig } from 'gatsby'

import './env'

const config: GatsbyConfig = {
    siteMetadata: {
        siteUrl: 'https://laurilavanti.fi',
        title: 'Lauri Lavanti',
        description: 'Kirkkonummelainen isä, ohjelmistokehittäjä, diplomi-insinööri, Lauri Lavanti.',
        author: 'laurilavanti',
        locale: 'fi_FI',
        twSite: '@laurilavanti',
        twCreator: '@laurilavanti',
        facebook: 'https://www.facebook.com/laurilavanti',
        twitter: 'https://twitter.com/laurilavanti',
        keywords: [
            'Kirkkonummi',
            'Länsi-Uusimaa',
            'kuntavaalit',
            'aluevaalit',
            'Vihreät',
            'Lauri Lavanti',
            'Lauri',
            'Lavanti',
            'poliitikko',
        ],
    },
    trailingSlash: 'always',
    plugins: [
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                host: process.env.CONTENTFUL_HOST || undefined,
                localeFilter: (locale: { code: string }) => locale.code === 'fi',
                useNameForId: false,
                enableTags: true,
                downloadLocal: true,
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [`IBM Plex Sans: 300,400,400i,500`, `IBM Plex Mono: 400,400i`, `Signika Negative`],
            },
        },
        'gatsby-plugin-emotion',
        'gatsby-plugin-image',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Lauri Lavanti',
                short_name: 'Lauri Lavanti',
                description: 'Kirkkonummelainen isä, ohjelmistokehittäjä, diplomi-insinööri, Lauri Lavanti.',
                start_url: '/',
                icon: 'logo.svg',
                background_color: '#045a1c',
                theme_color: '#045a1c',
                display: 'standalone',
                lang: 'fi',
            },
        },
        {
            resolve: 'gatsby-plugin-sharp',
            options: {
                defaults: {
                    placeholder: 'blurred',
                },
            },
        },
        'gatsby-transformer-sharp',
    ],
}

export default config
