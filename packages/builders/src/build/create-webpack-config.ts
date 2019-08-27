// https://github.com/nrwl/nx/blob/master/packages/node/src/utils/config.ts
import * as webpack from 'webpack';
import { Configuration, Stats, Plugin, ProgressPlugin } from 'webpack';
import CircularDependencyPlugin = require('circular-dependency-plugin');
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import nodeExternals = require('webpack-node-externals');
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';

import { BuildOptions } from './types';
import {BuilderContext} from "@angular-devkit/architect";
import { inlineFilesTransformer, stripStylesTransformer } from './transformers';

function getAliases(options: BuildOptions): Record<string, string> {
  return options.fileReplacements.reduce(
    (aliases, replacement) => ({
      ...aliases,
      [replacement.replace]: replacement.with
    }),
    {}
  );
}

function getStatsConfig(options: BuildOptions): Stats.ToStringOptions {
  return {
    hash: true,
    timings: false,
    cached: false,
    cachedAssets: false,
    modules: false,
    warnings: true,
    errors: true,
    colors: !options.verbose && !options.statsJson,
    chunks: !options.verbose,
    assets: !!options.verbose,
    chunkOrigins: !!options.verbose,
    chunkModules: !!options.verbose,
    children: !!options.verbose,
    reasons: !!options.verbose,
    version: !!options.verbose,
    errorDetails: !!options.verbose,
    moduleTrace: !!options.verbose,
    usedExports: !!options.verbose
  };
}

export function createWebpackConfig(options: BuildOptions): Configuration {
  const extensions = ['.ts', '.mjs', '.js'];
  const mainFields = ['module', 'main'];

  const webpackConfig: Configuration = {
    entry: {
      main: [options.main],
    },
    target: 'node',
    externals: [
      nodeExternals({
        modulesDir: resolve(options.root!, '../../node_modules'),
      }),
    ],
    devtool: options.sourceMap && 'source-map',
    mode: options.optimization ? 'production' : 'development',
    output: {
      path: options.outputPath,
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.(html|css)$/,
          loader: 'raw-loader',
        },
        {
          test: /\.(j|t)sx?$/,
          loader: 'ts-loader',
          options: {
            configFile: options.tsConfig,
            transpileOnly: true,
            getCustomTransformers: (program) => ({
              before: [
                inlineFilesTransformer(program),
                stripStylesTransformer(program),
              ],
            }),
          }
        },
      ],
    },
    resolve: {
      extensions,
      alias: getAliases(options),
      plugins: [
        new TsConfigPathsPlugin({
          configFile: options.tsConfig,
          extensions,
          mainFields
        })
      ],
      mainFields
    },
    performance: {
      hints: false
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tsconfig: options.tsConfig,
        useTypescriptIncrementalApi: options.useTypescriptIncrementalApi,
        workers: options.useTypescriptIncrementalApi
          ? ForkTsCheckerWebpackPlugin.ONE_CPU
          : options.maxWorkers || ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
      })
    ],
    stats: getStatsConfig(options)
  };

  const extraPlugins: Plugin[] = [];

  if (options.progress) {
    extraPlugins.push(new ProgressPlugin());
  }

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
          dot: true
        }
      };
    });

    const copyWebpackPluginOptions = {
      ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db']
    };

    const copyWebpackPluginInstance = new CopyWebpackPlugin(
      copyWebpackPluginPatterns,
      copyWebpackPluginOptions
    );
    extraPlugins.push(copyWebpackPluginInstance);
  }

  if (options.showCircularDependencies) {
    extraPlugins.push(
      new CircularDependencyPlugin({
        exclude: /[\\\/]node_modules[\\\/]/
      })
    );
  }

  webpackConfig.plugins = [...webpackConfig.plugins!, ...extraPlugins];

  return webpackConfig;
}