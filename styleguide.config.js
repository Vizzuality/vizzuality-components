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
      name: 'UI-components',
      components: () => ([
        path.resolve(__dirname, 'src/components/icon', 'index.js'),
        path.resolve(__dirname, 'src/components/icons', 'index.js'),
        path.resolve(__dirname, 'src/components/tooltip', 'index.js')
      ])
    },
    {
      name: 'Form-components',
      components: () => ([
        path.resolve(__dirname, 'src/components/form/range', 'index.js')
      ])
    },
    {
      name: 'Map-components',
      components: () => ([
        path.resolve(__dirname, 'src/components/map', 'index.js'),
        path.resolve(__dirname, 'src/components/map/map-popup', 'index.js')
      ])
    },
    {
      name: 'Map-control-components',
      components: () => ([
        path.resolve(__dirname, 'src/components/map/map-controls', 'index.js'),
        path.resolve(__dirname, 'src/components/map/map-controls/draw-control', 'index.js'),
        path.resolve(__dirname, 'src/components/map/map-controls/zoom-control', 'index.js')
      ])
    },
    {
      name: 'Legend-components',
      components: () => ([
        path.resolve(__dirname, 'src/components/legend', 'index.js')
      ])
    },
    {
      name: 'Widgets-components',
      components: () => ([
        path.resolve(__dirname, 'src/components/widgets/vega-chart', 'index.js')
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
