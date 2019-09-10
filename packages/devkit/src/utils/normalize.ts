import { normalize } from '@angular-devkit/core';
import { resolve, dirname, relative, basename } from 'path';
import * as fs from 'fs';

import {
  AotBuildOptions,
  NodeBuildOptions,
  BuildOptionsUnion,
} from '../builders/build/types';

export interface FileReplacement {
  replace: string;
  with: string;
}

export function resolveModulesDir(root: string): string {
  const dir = resolve(root, 'node_modules');

  try {
    fs.accessSync(dir, fs.constants.R_OK);
    return dir;
  } catch {}

  const parentDir = resolve(root, '..');
  return resolveModulesDir(parentDir);
}

function resolveOptional(root: string, property: string): string {
  return property ? resolve(root, property) : property;
}

function normalizeFileReplacements(
  root: string,
  fileReplacements: FileReplacement[],
): FileReplacement[] {
  return fileReplacements.map(fileReplacement => ({
    replace: resolve(root, fileReplacement.replace),
    with: resolve(root, fileReplacement.with),
  }));
}

function normalizeAssets(
  assets: any[],
  root: string,
  sourceRoot: string,
): any[] {
  return assets.map(asset => {
    if (typeof asset === 'string') {
      const assetPath = normalize(asset);
      const resolvedAssetPath = resolve(root, assetPath);
      const resolvedSourceRoot = resolve(root, sourceRoot);

      if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
        throw new Error(
          `The ${resolvedAssetPath} asset path must start with the project source root: ${sourceRoot}`,
        );
      }

      const isDirectory = fs.statSync(resolvedAssetPath).isDirectory();
      const input = isDirectory
        ? resolvedAssetPath
        : dirname(resolvedAssetPath);
      const output = relative(resolvedSourceRoot, resolve(root, input));
      const glob = isDirectory ? '**/*' : basename(resolvedAssetPath);
      return {
        input,
        output,
        glob,
      };
    } else {
      if (asset.output.startsWith('..')) {
        throw new Error(
          'An asset cannot be written to a location outside of the output path.',
        );
      }

      const assetPath = normalize(asset.input);
      const resolvedAssetPath = resolve(root, assetPath);
      return {
        ...asset,
        input: resolvedAssetPath,
        // Now we remove starting slash to make Webpack place it from the output root.
        output: asset.output.replace(/^\//, ''),
      };
    }
  });
}

export function normalizeBaseBuildOptions<T extends BuildOptionsUnion>(
  options: T,
  root: string,
  sourceRoot: string,
): BuildOptionsUnion {
  return {
    ...options,
    root,
    sourceRoot,
    main: resolve(root, options.main),
    outputPath: resolve(root, options.outputPath),
    tsConfig: resolve(root, options.tsConfig),
    fileReplacements: normalizeFileReplacements(root, options.fileReplacements),
    assets: normalizeAssets(options.assets!, root, sourceRoot),
    webpackConfig: resolveOptional(root, options.webpackConfig),
  };
}

export function normalizeAotBuildOptions<T extends AotBuildOptions>(
  options: T,
  root: string,
): T {
  return {
    ...options,
    entryModule: resolve(root, options.entryModule),
  };
}

export function normalizeNodeBuildOptions<T extends NodeBuildOptions>(
  options: T,
  root: string,
): T {
  return {
    ...options,
  };
}
