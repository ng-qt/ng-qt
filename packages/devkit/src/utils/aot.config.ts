import { Configuration } from 'webpack';
import { AngularCompilerPlugin } from '@ngtools/webpack';
import { BuildOptimizerWebpackPlugin } from '@angular-devkit/build-optimizer';
import * as ts from 'typescript';

import { importPolyfillsTransformer } from '../transformers/import-polyfills-transformer';
import { replaceFactoryBootstrap } from '../transformers/replace-factory-bootstrap';
import { AotBuildOptions } from '../builders/build/types';

export type NgCompilerTransformer = (
  ngCompiler: () => AngularCompilerPlugin,
  options: AotBuildOptions,
) => ts.TransformerFactory<ts.SourceFile>;

export function getAotWebpackConfig(options: AotBuildOptions): Configuration {
  const ngCompilerTransformers: NgCompilerTransformer[] = [];

  if (options.aot) {
    ngCompilerTransformers.push(replaceFactoryBootstrap);
  }

  // has to be the last since it needs to put polyfills as top imports
  ngCompilerTransformers.push(importPolyfillsTransformer);

  const platformTransformers = ngCompilerTransformers.map(t =>
    t(() => ngCompilerPlugin, options),
  );

  const ngCompilerPlugin = new AngularCompilerPlugin({
    tsConfigPath: options.tsConfig,
    entryModule: options.entryModule,
    sourceMap: options.sourceMap,
    mainPath: options.main,
    basePath: options.root,
    skipCodeGeneration: !options.aot,
    platformTransformers,
  });

  const webpackConfig: Configuration = {
    module: {
      rules: [
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack',
        },
      ],
    },
    plugins: [ngCompilerPlugin],
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
