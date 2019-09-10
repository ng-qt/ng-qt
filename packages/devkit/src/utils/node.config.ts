import { Configuration, Stats } from 'webpack';
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

import { inlineAssetsTransformer } from './inline-assets-transformer';
import { BaseBuildOptions, NodeBuildOptions } from '../builders/build/types';

function getAliases(options: BaseBuildOptions): Record<string, string> {
  return options.fileReplacements.reduce(
    (aliases, replacement) => ({
      ...aliases,
      [replacement.replace]: replacement.with,
    }),
    {},
  );
}

function getStatsConfig(options: BaseBuildOptions): Stats.ToStringOptions {
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
    usedExports: !!options.verbose,
  };
}

export function getNodeWebpackConfig(options: NodeBuildOptions): Configuration {
  const webpackConfig: Configuration = {
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          loader: 'ts-loader',
          options: {
            configFile: options.tsConfig,
            transpileOnly: true,
            compilerOptions: {
              declaration: false,
              noEmit: true,
            },
            getCustomTransformers: () => ({
              before: [inlineAssetsTransformer()],
            }),
          },
        },
      ],
    },
    resolve: {
      alias: getAliases(options),
    },
    performance: {
      hints: false,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tsconfig: options.tsConfig,
        useTypescriptIncrementalApi: options.useTypescriptIncrementalApi,
        workers: options.useTypescriptIncrementalApi
          ? ForkTsCheckerWebpackPlugin.ONE_CPU
          : options.maxWorkers || ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
      }),
    ],
    stats: getStatsConfig(options),
  };

  if (options.optimization) {
    webpackConfig.optimization = {
      minimize: false,
      concatenateModules: false,
    };
  }

  return webpackConfig;
}
