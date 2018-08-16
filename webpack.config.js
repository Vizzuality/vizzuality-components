const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {

  devtool: 'source-map',

  entry: { components: path.resolve(__dirname, 'src/components/index.js') },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|dist)/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
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
        })
      }
    ]
  },

  externals: [
    'react',
    'react-dom',
    'react-css-modules',
    'react-input-range',
    'react-sortable-hoc',
    'rc-tooltip',
    'leaflet',
    'vega'
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    symlinks: false
  },

  plugins: [
    new UglifyJsPlugin({ cache: true, parallel: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({
      disable: false,
      allChunks: true,
      filename: '[name].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    process.env.BUNDLE_ANALYZE ? new BundleAnalyzerPlugin({ excludeAssets: /vega-lib/, analyzerMode: 'static' }) : () => {}
  ]

};

module.exports = config;
