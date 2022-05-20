import type { GatsbyConfig } from 'gatsby'

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
    trailingSlash: 'never',
    plugins: [
        'gatsby-plugin-emotion',
        'gatsby-plugin-gatsby-cloud',
        'gatsby-plugin-image',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        /*{
            resolve: 'gatsby-plugin-sitemap',
            options: {
                query: `
                {
                    allMdx {
                      nodes {
                        frontmatter {
                          date
                          modified
                        }
                        slug
                      }
                    }
                    allSitePage {
                      nodes {
                        path
                      }
                    }
                  }                  
                `,
                resolveSiteUrl: () => 'https://laurilavanti.fi',
                resolvePages: ({
                    allMdx: { nodes: allMdxNodes },
                    allSitePage: {
                        nodes: { allPageNodes },
                    },
                }) => {
                    const mdxMap = allMdxNodes.reduce((acc, curr) => ({
                        ...acc,
                        [`/${curr.slug}`]: curr.frontmatter.modified || curr.frontmatter.date,
                    }))
                    return allPageNodes.map((page) => ({ url: page.path, lastmod: mdxMap[page.path] }))
                },
                serialize: ({ url, lastmod }) => ({ url, lastmod }),
            },
        },*/
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
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './src/images/',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: './src/pages/',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: './src/mdxPages/',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'blog',
                path: './src/posts/',
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {},
        },
    ],
}

export default config
