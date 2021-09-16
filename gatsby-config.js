module.exports = {
    siteMetadata: {
        siteUrl: 'https://laurilavanti.fi',
        title: 'Lauri Lavanti',
    },
    plugins: [
        'gatsby-plugin-preact',
        'gatsby-plugin-emotion',
        'gatsby-plugin-gatsby-cloud',
        'gatsby-plugin-image',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/icon.png',
            },
        },
        'gatsby-plugin-mdx',
        {
            resolve: 'gatsby-plugin-sharp',
            options: {
                defaults: {
                    placeholder: 'blurred',
                },
            },
        },
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './src/images/',
            },
            __key: 'images',
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: './src/pages/',
            },
            __key: 'pages',
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'blog',
                path: './blog/',
            },
            __key: 'blog',
        },
        'gatsby-plugin-mdx',
        {
            resolve: 'gatsby-plugin-prettier-eslint',
            options: {
                prettier: {
                    patterns: [
                        // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
                        '**/*.{css,scss,less}',
                        '**/*.{json,json5}',
                        '**/*.{graphql}',
                        '**/*.{md,mdx}',
                        '**/*.{html}',
                        '**/*.{yaml,yml}',
                    ],
                },
                eslint: {
                    patterns: '**/*.{js,jsx,ts,tsx}',
                    customOptions: {
                        fix: true,
                        cache: true,
                    },
                },
            },
        },
        {
            resolve: 'gatsby-redirect-from',
            options: {
                query: 'allMdx',
            },
        },
        'gatsby-plugin-meta-redirect', // make sure this is always the last one
    ],
}
