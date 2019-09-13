import { Path } from '@angular-devkit/core';

export interface FileReplacement {
  replace: string;
  with: string;
}

export interface BuildOptions {
  main: string;
  aot: boolean;
  outputPath: string;
  tsConfig: string;
  optimization: boolean;
  showCircularDependencies: boolean;
  fileReplacements: FileReplacement[];
  assets?: any[];
  progress?: boolean;
  statsJson?: boolean;
  verbose?: boolean;
  webpackConfig?: string;
  root?: Path;
  sourceRoot?: Path;
  sourceMap?: boolean;
  watch?: boolean;
  poll?: number;
  polyfills?: string;
  forkTypeChecker?: boolean;
  entryModule?: string;
}
