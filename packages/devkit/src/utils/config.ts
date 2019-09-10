// https://github.com/nrwl/nx/blob/master/packages/node/src/utils/config.ts
import { Configuration, Plugin } from 'webpack';
import CircularDependencyPlugin = require('circular-dependency-plugin');
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import { BaseBuildOptions } from '../builders/build/types';
import { resolveModulesDir } from './normalize';

export function getBaseWebpackConfig(options: BaseBuildOptions): Configuration {
  const modulesDir = resolveModulesDir(options.root);
  const extensions = ['.ts', '.mjs', '.js', '.json'];
  const mainFields = ['module', 'main'];

  const webpackConfig: Configuration = {
    entry: {
      main: [options.main],
    },
    target: 'node',
    // @ts-ignore
    devtool: options.sourceMap && 'source-map',
    node: false,
    externals: [nodeExternals({ modulesDir })],
    mode: options.optimization ? 'production' : 'development',
    output: {
      path: options.outputPath,
      libraryTarget: 'commonjs',
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.(html|css)$/,
          loader: 'raw-loader',
        },
      ],
    },
    watch: options.watch,
    watchOptions: {
      poll: options.poll,
    },
    resolve: {
      extensions,
      mainFields,
      plugins: [
        new TsConfigPathsPlugin({
          configFile: options.tsConfig,
          extensions,
          mainFields,
        }),
      ],
    },
    plugins: [],
  };

  // process asset entries
  if (options.assets) {
    const copyWebpackPluginPatterns = options.assets.map((asset: any) => {
      return {
        context: asset.input,
        // Now we remove starting slash to make Webpack place it from the output root.
        to: asset.output,
        ignore: asset.ignore,
        from: {
          glob: asset.glob,
          dot: true,
        },
      };
    });

    const copyWebpackPluginOptions = {
      ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
    };

    const copyWebpackPluginInstance = new CopyWebpackPlugin(
      copyWebpackPluginPatterns,
      copyWebpackPluginOptions,
    );
    webpackConfig.plugins.push(copyWebpackPluginInstance);
  }

  if (options.showCircularDependencies) {
    webpackConfig.plugins.push(
      new CircularDependencyPlugin({
        exclude: /[\\\/]node_modules[\\\/]/,
      }),
    );
  }

  return webpackConfig;
}
