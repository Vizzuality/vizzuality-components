const path = require('path');
const glob = require('glob');

module.exports = {
  devtool: 'cheap-eval-source-map',
  resolve: { extensions: ['.js', '.jsx', '.json'] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.(jpg|jpeg|png|gif)$/, use: 'url-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              includePaths: ['./node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: 'wri_api__[local]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules', './src/css']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    ]
  },
  plugins: []
};
