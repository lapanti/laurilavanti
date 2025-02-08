import React from 'react'

const gatsby = jest.requireActual('gatsby-plugin-image')

module.exports = {
    ...gatsby,
    StaticImage: jest.fn(({ backgroundColor, objectFit, ...props }) => React.createElement('img', props)),
}
