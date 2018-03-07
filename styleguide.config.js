const path = require('path');
const webpackConfig = require('./styleguide.webpack.js');
const { version } = require('./package.json');

module.exports = {
  title: `WRI components | ${version}`,
  sections: [
    {
      name: 'Components',
      components: () => ([
        path.resolve(__dirname, 'src/components/icon', 'index.js')
      ])
    },
    {
      name: 'Legend',
      components: () => ([
        path.resolve(__dirname, 'src/components/legend', 'legend-component.js')
      ])
    }
  ],
  showUsage: true,
  showCode: true,
  skipComponentsWithoutExample: true,
  webpackConfig
};
