const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const rootPath = process.cwd();

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {

  entry: { components: path.resolve(__dirname, 'src/components/index.js') },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
                localIdentName: '[local]'
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
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
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
    new ExtractTextPlugin({
      disable: false,
      allChunks: true,
      filename: '[name].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: { comments: false }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    process.env.BUNDLE_ANALIZE ? new BundleAnalyzerPlugin({ analyzerMode: 'static' }) : () => {}
  ]

};

module.exports = config;
