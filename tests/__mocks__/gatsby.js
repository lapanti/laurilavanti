import React from 'react'

import { footerNav } from '../footerNav.mock'
import { mainNav } from '../mainNav.mock'
import { excerptList } from '../posts.mock'

const gatsby = jest.requireActual('gatsby')

module.exports = {
    ...gatsby,
    Link: jest.fn().mockImplementation(
        // these props are invalid for an `a` tag
        ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
            React.createElement('a', {
                ...rest,
                href: to,
            })
    ),
    StaticQuery: jest.fn(),
    graphql: jest.fn(),
    useStaticQuery: jest.fn(() => ({
        allContentfulPost: {
            nodes: excerptList,
        },
        contentfulFooterNav: footerNav,
        contentfulMainNav: mainNav,
        site: {
            siteMetadata: {
                author: 'laurilavanti',
                bluesky: 'https://bsky.app/profile/laurilavanti.fi',
                description:
                    'Kirkkonummen Vihreiden puheenjohtaja, isä, johtava ohjelmistokehittäjä, diplomi-insinööri, Lauri Lavanti.',
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
                mastodon: 'https://mastodontti.fi/@laurilavanti',
                siteUrl: 'https://laurilavanti.fi',
                threads: 'https://www.threads.net/@laurilavanti',
                tiktok: 'https://www.tiktok.com/@laurilavanti',
                title: 'Lauri Lavanti',
            },
        },
    })),
}
