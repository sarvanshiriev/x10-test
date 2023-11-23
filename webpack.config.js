const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/js/main.js',
  output: {
    filename: 'script.min.js',
    path: path.resolve(__dirname, 'app/js')
  }
};