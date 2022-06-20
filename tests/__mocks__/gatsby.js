const React = require('react')
const { excerptList } = require('../posts.mock')

const gatsby = jest.requireActual('gatsby')

module.exports = {
    ...gatsby,
    graphql: jest.fn(),
    Link: jest.fn().mockImplementation(
        // these props are invalid for an `a` tag
        ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
            React.createElement('a', {
                ...rest,
                href: to,
            })
    ),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(() => ({
        allContentfulPost: {
            nodes: excerptList,
        },
        site: {
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
        },
    })),
}
