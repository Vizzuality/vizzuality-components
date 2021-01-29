import path from 'path';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import builtins from 'rollup-plugin-node-builtins';
import resolve from '@rollup/plugin-node-resolve';
import visualizer from 'rollup-plugin-visualizer';

import packageJson from './package.json';
import babelConfig from './babel.config.json';

const configuration = {
  input: 'src/components/index.js',
  output: [
    // For Node.js, Webpack < 2 and SSR
    // This CANNOT be tree-shaken
    // All the files are bundled together
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      compact: true,
    },
    // For Webpack > 2
    // This CAN be tree-shaken
    // The files are not bundled (required for tree-shaking)
    {
      dir: 'dist',
      preserveModules: true, // This option prevent bundling the files
      preserveModulesRoot: 'src/components', // This option simplifies the path in the output folder
      entryFileNames: '[name].esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(packageJson.peerDependencies),
    ...Object.keys(packageJson.dependencies),
    /^lodash\/.*$/, // Mark all lodash/* as external
    /^babel-plugin-react-css-modules\/.*$/, // The babel config requires this
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    builtins(), // Needed to solve some issues with unresolved dependencies
    postcss({
      extract: 'bundle.css',
      modules: {
        ...babelConfig.plugins[1][1], // CSS modules configuration
      },
      autoModules: false,
      minimize: true,
      use: [
        [
          'sass',
          {
            includePaths: [path.join(__dirname, 'src/css')],
          },
        ],
      ],
    }),
  ],
};

// If we want to analyze the bundle's size, we tweak the configuration to get a better picture of
// its total impact (including the dependencies')
if (process.env.ANALYZE_BUNDLE) {
  configuration.output = [configuration.output[0]]; // The result will be based on the cjs module
  configuration.external = [...Object.keys(packageJson.peerDependencies)];
  configuration.plugins = [
    resolve(), // This includes the external dependencies, giving a more accurate visualization
    ...configuration.plugins,
    visualizer({ open: true }),
  ];
}

export default configuration;
