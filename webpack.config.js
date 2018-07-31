/* eslint-env node */

const webpack = require('webpack')
const packageJson = require('./package.json')

const license =
`/*
* Averto ${packageJson.version}
* @homepage ${packageJson.homepage}
* @license ${packageJson.license}
*/`

const plugins = [
    new webpack.BannerPlugin(license),
]

module.exports = {
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [ 'css-to-string-loader', 'css-loader', 'csso-loader' ]
            }
          ]
    },
    entry: {
        averto: './source/averto.js',
        "averto-commonjs": './source/index.js',
    },
    output: {
        filename: '[name].js',
        library: 'averto',
        libraryTarget: 'umd',
    },
    devtool: false,
    watch: false,
    plugins,
}