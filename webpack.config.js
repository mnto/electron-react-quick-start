const webpack = require('webpack');

module.exports = {
  entry: './frontend/reactApp/app.js',
  output: {
    path: __dirname + '/frontend/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /reactApp\/(.)*\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
