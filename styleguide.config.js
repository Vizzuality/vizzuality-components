const path = require('path');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');

const webpackConfig = require('./styleguide.webpack.js');
const { name, version } = require('./package.json');

module.exports = {
  title: `WRI components | ${version}`,
  template: './styleguide.template.html',
  sections: [
    {
      name: 'Components',
      components: () => ([
        path.resolve(__dirname, 'src/components/icon', 'index.js'),
        path.resolve(__dirname, 'src/components/tooltip', 'index.js')
      ])
    },
    {
      name: 'Form',
      components: () => ([
        path.resolve(__dirname, 'src/components/form/radio', 'index.js'),
        path.resolve(__dirname, 'src/components/form/range', 'index.js')
      ])
    },
    {
      name: 'Legend',
      components: () => ([
        path.resolve(__dirname, 'src/components/legend', 'index.js')
      ])
    }
  ],
  showUsage: true,
  skipComponentsWithoutExample: true,
  getComponentPathLine: (componentPath) => {
    const dirname = path.dirname(componentPath, '.js');
    const componentName = upperFirst(camelCase(dirname.split('/').slice(-1)[0]));

    return `import { ${componentName} } from '${name}'`;
  },
  webpackConfig
};
