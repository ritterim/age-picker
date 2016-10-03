module.exports = {
  entry: './src/age-picker.js',
  output: {
    path: './lib',
    filename: 'age-picker.js',
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
  }
};
