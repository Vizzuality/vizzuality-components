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

  devtool: isDev ? 'cheap-eval-source-map' : false,

  mode: env,

  entry: {
    form: path.resolve(__dirname, 'src/components/form/index.js'),
    icon: path.resolve(__dirname, 'src/components/icon/index.js'),
    icons: path.resolve(__dirname, 'src/components/icons/index.js'),
    legend: path.resolve(__dirname, 'src/components/legend/index.js'),
    map: path.resolve(__dirname, 'src/components/map/index.js'),
    tooltip: path.resolve(__dirname, 'src/components/tooltip/index.js'),
    bundle: path.resolve(__dirname, 'src/components/index.js'),
    spinner: path.resolve(__dirname, 'src/components/spinner/index.js'),
    // datepicker: path.resolve(__dirname, 'src/components/datepicker/index.js'),
    slider: path.resolve(__dirname, 'src/components/slider/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              includePaths: ['./node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          },
          'postcss-loader'
        ]
      },
      { test: /\.(jpg|jpeg|png|gif)$/, use: 'url-loader' },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              filename: isDev ? '[name].css' : '[name].[hash].css',
              chunkFilename: isDev ? '[id].css' :  '[id].[hash].css'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: 'vizzuality__[local]'
            }
          },
          'postcss-loader',
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
    'leaflet',
    'vega',
    'vega-lib',
    'moment'
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
          ecma: 5,
          output: { comments: false },
          compress: { dead_code: true, drop_console: true }
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
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
