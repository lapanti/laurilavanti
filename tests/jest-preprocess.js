const babelOptions = {
    presets: [['babel-preset-gatsby', { reactRuntime: 'automatic' }], '@babel/preset-typescript'],
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
module.exports = require('babel-jest').default.createTransformer(babelOptions)
