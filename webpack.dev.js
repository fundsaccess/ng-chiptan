const path = require('path');

module.exports = {
  entry: './src/app/app.js',
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src'),
  },
};
