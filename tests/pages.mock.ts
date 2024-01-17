import type { ContentfulPage } from '../src/types/contentful'

export const frontPage: ContentfulPage = {
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
    image: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'fixed',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAHABUDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/9oADAMBAAIQAxAAAAGe4FzhmP/EABgQAAIDAAAAAAAAAAAAAAAAAAADAQIS/9oACAEBAAEFAoWXXlZ//8QAFREBAQAAAAAAAAAAAAAAAAAAARD/2gAIAQMBAT8BZ//EABURAQEAAAAAAAAAAAAAAAAAABBB/9oACAECAQE/AYf/xAAYEAACAwAAAAAAAAAAAAAAAAARMQABEP/aAAgBAQAGPwJwlVn/xAAaEAADAAMBAAAAAAAAAAAAAAAAAREhQWFx/9oACAEBAAE/IUuuvCcl8B1PGz//2gAMAwEAAgADAAAAEIgv/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAIAQMBAT8QhX//xAAXEQADAQAAAAAAAAAAAAAAAAAAAREh/9oACAECAQE/EFrUp//EABoQAQACAwEAAAAAAAAAAAAAAAEAESExUaH/2gAIAQEAAT8QKTFukBeYXpZ32OwC8mf/2Q==',
                    },
                    images: {
                        fallback: {
                            src: '/static/def1f6087f87810dc50189a1b172ee7e/921a3/lauri-lavanti.jpg',
                            srcSet: '/static/def1f6087f87810dc50189a1b172ee7e/921a3/lauri-lavanti.jpg 1953w,\n/static/def1f6087f87810dc50189a1b172ee7e/2a1d8/lauri-lavanti.jpg 3906w',
                            sizes: '1953px',
                        },
                        sources: [
                            {
                                srcSet: '/static/def1f6087f87810dc50189a1b172ee7e/cbe52/lauri-lavanti.webp 1953w,\n/static/def1f6087f87810dc50189a1b172ee7e/10d46/lauri-lavanti.webp 3906w',
                                type: 'image/webp',
                                sizes: '1953px',
                            },
                        ],
                    },
                    width: 1953,
                    height: 667,
                },
            },
        },
    },
    mobileImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'fixed',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAbABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMCBAUB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgMA/9oADAMBAAIQAxAAAAFc7kzs44SOgym26pCiA//EABsQAAIDAAMAAAAAAAAAAAAAAAIDAAEhEjEy/9oACAEBAAEFAk6R4cUkYShl5aDwiqo0uRo6PxP/xAAWEQEBAQAAAAAAAAAAAAAAAAAQARH/2gAIAQMBAT8Bpp//xAAYEQACAwAAAAAAAAAAAAAAAAABEBESMv/aAAgBAgEBPwGsoZX/xAAeEAABBAEFAAAAAAAAAAAAAAAAARARIUECEjFRcf/aAAgBAQAGPwJCm3dnFrkgjBZKGr0Vv//EABwQAAMBAQADAQAAAAAAAAAAAAABESExEEFxof/aAAgBAQABPyHIc57IYkz7R0TV6+N4SxQBkxsaKu3DFGrPwrKifjMgz//aAAwDAQACAAMAAAAQd+eB/8QAGBEBAQEBAQAAAAAAAAAAAAAAAQARITH/2gAIAQMBAT8QRmXZA+S7f//EABkRAAMBAQEAAAAAAAAAAAAAAAABIRExUf/aAAgBAgEBPxBskNfgjrTtP//EAB4QAQEAAgIDAQEAAAAAAAAAAAERACExUUFhccHR/9oACAEBAAE/EKoxS1OOZdXKkM0cDZtNd41FFBsH+5BsWg+feT5ZEe8AQkQ9XOfpWhw7wlIBz594IXh2vzCRk1+5unzP/9k=',
                    },
                    images: {
                        fallback: {
                            src: '/static/17e4ec3d9fac9cc09354828602f3a080/68b03/lauri-lavanti.jpg',
                            srcSet: '/static/17e4ec3d9fac9cc09354828602f3a080/68b03/lauri-lavanti.jpg 486w,\n/static/17e4ec3d9fac9cc09354828602f3a080/e8784/lauri-lavanti.jpg 972w',
                            sizes: '486px',
                        },
                        sources: [
                            {
                                srcSet: '/static/17e4ec3d9fac9cc09354828602f3a080/4820e/lauri-lavanti.webp 486w,\n/static/17e4ec3d9fac9cc09354828602f3a080/34f42/lauri-lavanti.webp 972w',
                                type: 'image/webp',
                                sizes: '486px',
                            },
                        ],
                    },
                    width: 486,
                    height: 667,
                },
            },
        },
    },
    updatedAt: '2023-05-24T14:51:46.661Z',
}
