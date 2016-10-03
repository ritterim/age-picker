const webpack = require('webpack');

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
    new webpack.optimize.UglifyJsPlugin()
  ]
};
