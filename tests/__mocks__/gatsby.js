const React = require('react')
const { excerptList } = require('../posts.mock')
const { mainNav } = require('../mainNav.mock')
const { footerNav } = require('../footerNav.mock')

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
        contentfulMainNav: mainNav,
        contentfulFooterNav: footerNav,
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
        },
    })),
}
