const path = require('path');
const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          // We maintain the markdown rules
          ...config.module.rules.filter((rule) => rule.test.toString().endsWith('.mdx$/')),
          ...custom.module.rules,
        ],
      },
      plugins: [...config.plugins, ...custom.plugins],
    };
  },
};
