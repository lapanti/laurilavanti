const React = require('react')

const gatsby = jest.requireActual('gatsby-plugin-image')

module.exports = {
    ...gatsby,
    StaticImage: jest.fn(({ backgroundColor, transformOptions, ...props }) => React.createElement('img', props)),
}
