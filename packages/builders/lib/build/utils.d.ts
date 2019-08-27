import { BuildOptions } from './types';
export interface FileReplacement {
  replace: string;
  with: string;
}
export declare function normalizeBuildOptions<T extends BuildOptions>(options: T, root: string, sourceRoot: string): T;
