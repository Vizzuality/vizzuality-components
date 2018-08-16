const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

const config = {

  devtool: isDev ? 'source-map' : false,

  mode: env,

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
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
              filename: isDev ? '[name].css' : '[name].[hash].css',
              chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
            }
          },
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

  externals: [
    'react',
    'react-dom',
    'react-css-modules',
    'react-input-range',
    'react-sortable-hoc',
    'rc-tooltip',
    'leaflet',
    'vega',
    'vega-lib'
  ],

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 6,
          output: { comments: false },
          compress: { dead_code: true, drop_console: true }
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]

};

if (process.env.BUNDLE_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

module.exports = config;
