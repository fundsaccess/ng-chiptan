const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const output = 'docs';

module.exports = {
  entry: path.resolve(__dirname, 'src/app/app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, output),
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, output) },
      { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, output) }
    ]),
    new CleanWebpackPlugin()
  ]
};
