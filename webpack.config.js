const webpack = require('webpack');
const packageJson = require('./package');

module.exports = {
  entry: './src/age-picker.js',
  output: {
    path: './lib',
    filename: 'age-picker.min.js',
    library: 'AgePicker',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(
`Age Picker
Copyright (c) 2016 Ritter Insurance Marketing
License: MIT
Repository: ${packageJson.repository.url}`),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
