import { Path } from '@angular-devkit/core';

export interface FileReplacement {
  replace: string;
  with: string;
}

export interface OptimizationOptions {
  scripts: boolean;
  styles: boolean;
}

export interface SourceMapOptions {
  scripts: boolean;
  styles: boolean;
  vendors: boolean;
  hidden: boolean;
}

export interface BaseBuildOptions {
  main: string;
  outputPath: string;
  tsConfig: string;
  optimization?: boolean | OptimizationOptions;
  showCircularDependencies: boolean;
  fileReplacements: FileReplacement[];
  assets?: any[];
  progress?: boolean;
  statsJson?: boolean;
  verbose?: boolean;
  webpackConfig?: string;
  root?: Path;
  sourceRoot?: Path;
  sourceMap?: boolean | SourceMapOptions;
  watch?: boolean;
  poll?: number;
}

export interface NodeBuildOptions extends BaseBuildOptions {
  useTypescriptIncrementalApi: boolean;
  debug: boolean;
  maxWorkers?: number;
}

export interface AotBuildOptions extends BaseBuildOptions {
  aot: boolean;
  forkTypeChecker: boolean;
  sourceMap: boolean;
  entryModule: string;
}

export type BuildOptionsUnion = NodeBuildOptions | AotBuildOptions;

export function isAotBuild(
  options: BuildOptionsUnion,
): options is AotBuildOptions {
  return 'aot' in options && options.aot; // && 'entryModule' in options;
}
