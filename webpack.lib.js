const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/lib/ng-chiptan.js'),
  output: {
    filename: 'ng-chiptan.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, 'src/lib/package.json'), to: path.resolve(__dirname, 'dist') },
      { from: path.resolve(__dirname, 'README.md'), to: path.resolve(__dirname, 'dist') },
    ]),
    new CleanWebpackPlugin(),
  ]
};
