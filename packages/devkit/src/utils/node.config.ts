import { Configuration } from 'webpack';
import { resolve } from 'path';
import * as fs from 'fs';
import * as mergeWebpack from 'webpack-merge';
import * as nodeExternals from 'webpack-node-externals';

import { BuildOptions } from '../builders/build/types';
import { getBaseWebpackPartial } from './config';

export function resolveModulesDir(root: string): string {
  const dir = resolve(root, 'node_modules');

  try {
    fs.accessSync(dir, fs.constants.R_OK);
    return dir;
  } catch {}

  const parentDir = resolve(root, '..');
  return resolveModulesDir(parentDir);
}

export function getNodePartial(options: BuildOptions) {
  const modulesDir = resolveModulesDir(options.root!);

  const webpackConfig: Configuration = {
    output: {
      libraryTarget: 'commonjs',
    },
    target: 'node',
    node: false,
    externals: [
      nodeExternals({
        modulesDir,
      }),
    ],
  };

  if (options.optimization) {
    webpackConfig.optimization = {
      minimize: false,
      concatenateModules: false,
    };
  }

  /*if (options.externalDependencies === 'all') {
    webpackConfig.externals = [nodeExternals()];
  } else if (Array.isArray(options.externalDependencies)) {
    webpackConfig.externals = [
      function(context, request, callback: Function) {
        if (options.externalDependencies.includes(request)) {
          // not bundled
          return callback(null, 'commonjs ' + request);
        }
        // bundled
        callback();
      }
    ];
  }*/

  return webpackConfig;
}

export function getNodeWebpackConfig(options: BuildOptions) {
  return mergeWebpack([getBaseWebpackPartial(options), getNodePartial(options)]);
}
