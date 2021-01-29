const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config, { configType }) => {
    const isDev = configType === 'DEVELOPMENT';

    // Add support for SCSS stylesheets
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: 'vizzuality__[local]',
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['../node_modules', '../src/css']
              .map((d) => path.join(__dirname, d))
              .map((g) => glob.sync(g))
              .reduce((a, c) => a.concat(c), []),
          },
        },
      ],
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
      })
    );

    return config;
  },
};
