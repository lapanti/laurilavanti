import type { GatsbyConfig } from 'gatsby'

import './env'

const config: GatsbyConfig = {
    jsxRuntime: 'automatic',
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
            options: {
                background_color: '#006275',
                description: 'Kirkkonummelainen isä, johtava ohjelmistokehittäjä, diplomi-insinööri, Lauri Lavanti.',
                display: 'standalone',
                icon: 'logo.svg',
                lang: 'fi',
                name: 'Lauri Lavanti',
                short_name: 'Lauri Lavanti',
                start_url: '/',
                theme_color: '#006275',
            },
            resolve: 'gatsby-plugin-manifest',
        },
        {
            options: {
                defaults: {
                    breakpoints: [320, 360, 560, 640, 720, 768, 1200, 1536, 2400, 3600],
                    formats: ['webp', 'auto'],
                    placeholder: 'blurred',
                    quality: 50,
                },
            },
            resolve: 'gatsby-plugin-sharp',
        },
        'gatsby-transformer-sharp',
        {
            options: {
                domains: ['https://images.ctfassets.net', 'https://static.cloudflareinsights.com'],
            },
            resolve: 'gatsby-plugin-preconnect',
        },
    ],
    siteMetadata: {
        author: 'laurilavanti',
        bluesky: 'https://bsky.app/profile/laurilavanti.fi',
        description: 'Kirkkonummelainen isä, johtava ohjelmistokehittäjä, diplomi-insinööri, Lauri Lavanti.',
        facebook: 'https://www.facebook.com/laurilavanti',
        instagram: 'https://www.instagram.com/laurilavanti/',
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
        linkedIn: 'https://www.linkedin.com/in/lapanti',
        locale: 'fi_FI',
        siteUrl: 'https://laurilavanti.fi',
        threads: 'https://www.threads.net/@laurilavanti',
        title: 'Lauri Lavanti',
    },
    trailingSlash: 'always',
}

export default config
