'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const webpack_1 = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const tsconfig_paths_webpack_plugin_1 = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path_1 = require('path');
const transformers_1 = require('./transformers');
function getAliases(options) {
  return options.fileReplacements.reduce(
    (aliases, replacement) => ({
      ...aliases,
      [replacement.replace]: replacement.with,
    }),
    {},
  );
}
function getStatsConfig(options) {
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
function createWebpackConfig(options) {
  const extensions = ['.ts', '.mjs', '.js'];
  const mainFields = ['module', 'main'];
  const webpackConfig = {
    entry: {
      main: [options.main],
    },
    target: 'node',
    externals: [
      nodeExternals({
        modulesDir: path_1.resolve(options.root, '../../node_modules'),
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
            getCustomTransformers: program => ({
              before: [transformers_1.inlineFilesTransformer(program), transformers_1.stripStylesTransformer(program)],
            }),
          },
        },
      ],
    },
    resolve: {
      extensions,
      alias: getAliases(options),
      plugins: [
        new tsconfig_paths_webpack_plugin_1.default({
          configFile: options.tsConfig,
          extensions,
          mainFields,
        }),
      ],
      mainFields,
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
  const extraPlugins = [];
  if (options.progress) {
    extraPlugins.push(new webpack_1.ProgressPlugin());
  }
  // process asset entries
  if (options.assets) {
    const copyWebpackPluginPatterns = options.assets.map(asset => {
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
    const copyWebpackPluginInstance = new CopyWebpackPlugin(copyWebpackPluginPatterns, copyWebpackPluginOptions);
    extraPlugins.push(copyWebpackPluginInstance);
  }
  if (options.showCircularDependencies) {
    extraPlugins.push(
      new CircularDependencyPlugin({
        exclude: /[\\\/]node_modules[\\\/]/,
      }),
    );
  }
  webpackConfig.plugins = [...webpackConfig.plugins, ...extraPlugins];
  return webpackConfig;
}
exports.createWebpackConfig = createWebpackConfig;
