const path = require('path');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');

const webpackConfig = require('./styleguide.webpack.js');
const { name, version } = require('./package.json');

module.exports = {
  title: `WRI components | ${version}`,
  template: {
    head: {
      links: [{
        rel: 'stylesheet',
        href: 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
      }],
      scripts: [{
        src: 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
      }, {
        src: 'https://unpkg.com/esri-leaflet/dist/esri-leaflet.js'
      }, {
        src: 'https://unpkg.com/leaflet-utfgrid/L.UTFGrid-min.js'
      }]
    }
  },
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'src/styleGuide'),
  },
  sections: [
    {
      name: 'UI-components',
      components: () => ([
        path.resolve(__dirname, 'src/components/icon', 'index.js'),
        path.resolve(__dirname, 'src/components/spinner', 'index.js'),
        path.resolve(__dirname, 'src/components/tooltip', 'index.js'),
        // path.resolve(__dirname, 'src/components/datepicker', 'index.js'),
        path.resolve(__dirname, 'src/components/slider', 'index.js')
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
        path.resolve(__dirname, 'src/components/map/map-controls', 'index.js'),
        path.resolve(__dirname, 'src/components/map/map-popup', 'index.js'),
        path.resolve(__dirname, 'src/components/map/map-side-by-side', 'index.js')
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
  // usageMode: true,
  skipComponentsWithoutExample: true,
  getComponentPathLine: (componentPath) => {
    const dirname = path.dirname(componentPath, '.js');
    const componentName = upperFirst(camelCase(dirname.split('/').slice(-1)[0]));

    return `import { ${componentName} } from '${name}'`;
  },
  webpackConfig
};
