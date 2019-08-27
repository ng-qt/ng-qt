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

export interface BuildOptions {
  main: string;
  outputPath: string;
  tsConfig: string;
  watch?: boolean;
  sourceMap?: boolean | SourceMapOptions;
  optimization?: boolean | OptimizationOptions;
  showCircularDependencies?: boolean;
  maxWorkers?: number;
  poll?: number;
  useTypescriptIncrementalApi: boolean;

  fileReplacements: FileReplacement[];
  assets?: any[];

  progress?: boolean;
  statsJson?: boolean;
  verbose?: boolean;

  webpackConfig?: string;

  root?: string;
  sourceRoot?: Path;
}