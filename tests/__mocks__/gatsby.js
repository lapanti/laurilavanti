const React = require('react')
const gatsbyConfig = require('../../gatsby-config')

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
        site: {
            siteMetadata: gatsbyConfig.siteMetadata,
        },
    })),
}
