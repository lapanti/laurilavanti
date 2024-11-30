import type { GatsbyConfig } from 'gatsby'

import './env'

const config: GatsbyConfig = {
    plugins: [
        {
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                downloadLocal: false,
                enableTags: true,
                host: process.env.CONTENTFUL_HOST || undefined,
                localeFilter: (locale: { code: string }) => locale.code === 'fi',
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                useNameForId: false,
            },
            resolve: `gatsby-source-contentful`,
        },
        'gatsby-plugin-styled-components',
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
        instagram: 'https://www.instagram.com/laurilavanti/',
        linkedIn: 'https://www.linkedin.com/in/lapanti',
        mastodon: 'https://mastodontti.fi/@laurilavanti',
        bluesky: 'https://bsky.app/profile/laurilavanti.fi',
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
}

export default config
