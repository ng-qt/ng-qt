import { Configuration } from 'webpack';
import CircularDependencyPlugin = require('circular-dependency-plugin');
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';
import { AngularCompilerPlugin } from '@ngtools/webpack';
import { BuildOptimizerWebpackPlugin } from '@angular-devkit/build-optimizer';
import * as ts from 'typescript';

import { BuildOptions } from '../builders/build/build-options.interface';
import { resolveModulesDir } from './normalize';
import { getAliases } from './get-aliases';
import { getStatsConfig } from './get-stats';
import {
  importPolyfillsTransformer,
  replaceFactoryBootstrap,
} from '../transformers';

export type NgCompilerTransformer = (
  ngCompiler: () => AngularCompilerPlugin,
  options: BuildOptions,
) => ts.TransformerFactory<ts.SourceFile>;

export function getWebpackConfig(options: BuildOptions): Configuration {
  const ngCompilerTransformers: NgCompilerTransformer[] = [];
  const modulesDir = resolveModulesDir(options.root);
  const extensions = ['.ts', '.mjs', '.js', '.json'];
  const mainFields = ['module', 'main'];
  const entries: string[] = [];

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

  if (options.polyfills) {
    entries.push(options.polyfills);
  }

  const webpackConfig: Configuration = {
    entry: {
      main: [...entries, options.main],
    },
    target: 'node',
    // @ts-ignore
    devtool: options.sourceMap && 'source-map',
    node: false,
    externals: [nodeExternals({ modulesDir })],
    mode: options.optimization ? 'production' : 'development',
    output: {
      path: options.outputPath,
      libraryTarget: 'commonjs2',
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.(html|css)$/,
          loader: 'raw-loader',
        },
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack',
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
      alias: getAliases(options),
    },
    plugins: [ngCompilerPlugin],
    stats: getStatsConfig(options),
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
