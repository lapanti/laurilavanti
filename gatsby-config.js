module.exports = {
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
        keywords: ['kuntavaalit', 'aluevaalit', 'Vihreät', 'Lauri Lavanti', 'Lauri', 'Lavanti', 'poliitikko'],
    },
    plugins: [
        'gatsby-plugin-preact',
        'gatsby-plugin-emotion',
        'gatsby-plugin-gatsby-cloud',
        'gatsby-plugin-image',
        'gatsby-plugin-react-helmet',
        {
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
                    allJavascriptFrontmatter {
                      edges {
                        node {
                          frontmatter {
                            modified
                            path
                          }
                        }
                      }
                    }
                  }
                  `,
                resolveSiteUrl: () => 'https://laurilavanti.fi',
                resolvePages: ({
                    allMdx: { nodes: allMdxNodes },
                    allSitePage: { nodes: allPageNodes },
                    allJavascriptFrontmatter: { edges: allPageEdges },
                }) => {
                    const mdxMap = allMdxNodes.reduce(
                        (acc, node) => ({
                            ...acc,
                            [`/${node.slug}`]: node.frontmatter.modified || node.frontmatter.date,
                        }),
                        {}
                    )
                    const pageMap = allPageEdges.reduce(
                        (acc, { node }) => ({ ...acc, [node.frontmatter.path]: node.frontmatter.modified }),
                        {}
                    )
                    return allPageNodes.map((page) => ({
                        url: page.path,
                        lastmod: mdxMap[page.path] || pageMap[page.path],
                    }))
                },
                serialize: ({ url, lastmod }) => ({ url, lastmod }),
            },
        },
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
        'gatsby-transformer-javascript-frontmatter',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'blog',
                path: './src/posts/',
            },
            __key: 'blog',
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {},
        },
        `gatsby-plugin-remove-trailing-slashes`,
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
    ],
}
