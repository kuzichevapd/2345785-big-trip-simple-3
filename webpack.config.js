const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{from: 'public'}]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'babel-loader'}
        ]
      }
    ]
  }
}
