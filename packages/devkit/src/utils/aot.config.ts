import { Configuration } from 'webpack';
import { AngularCompilerPlugin, NgToolsLoader } from '@ngtools/webpack';
import { BuildOptimizerWebpackPlugin } from '@angular-devkit/build-optimizer';

import { AotBuildOptions } from '../builders/build/types';

export function getAotWebpackConfig(options: AotBuildOptions): Configuration {
  const webpackConfig: Configuration = {
    module: {
      rules: [
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack',
        },
      ],
    },
    plugins: [
      new AngularCompilerPlugin({
        tsConfigPath: options.tsConfig,
        entryModule: options.entryModule,
        sourceMap: options.sourceMap,
        mainPath: options.main,
        basePath: options.root,
        discoverLazyRoutes: true,
        // forkTypeChecker: options.forkTypeChecker,
      }),
    ],
  };

  if (options.optimization) {
    webpackConfig.module.rules.push({
      test: /\.js$/,
      loader: '@angular-devkit/build-optimizer/webpack-loader',
      options: {
        sourceMap: options.sourceMap,
      },
    });

    webpackConfig.plugins.push(new BuildOptimizerWebpackPlugin());
  }

  return webpackConfig;
}
