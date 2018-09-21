import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import babelPlugin from 'rollup-plugin-babel';
import commonjsPlugin from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import rollupAll from 'rollup-all';

// const globals = {
//   'react-dom': 'ReactDOM',
//   react: 'React',
//   bluebird: 'Promise'
// };

// const external = Object.keys(globals);

const babelOptions = {
  exclude: 'node_modules/**',
  runtimeHelpers: true
};

const nodeResolveOptions = {
  module: true,
  jsnext: true,
  main: true
};

const plugins = [
  nodeResolvePlugin(nodeResolveOptions),
  babelPlugin(babelOptions),
  commonjsPlugin()
];

// export default [
//   {
//     input: 'src/components/index.js',
//     output: {
//       file: 'lib/index.js',
//       format: 'es',
//       globals
//     },
//     external: [...external],
//     plugins: [
//       nodeResolvePlugin(nodeResolveOptions),
//       babelPlugin(babelOptions),
//       commonjsPlugin()
//     ]
//   }
// ];

export default rollupAll.getExports(uglify(), plugins);
