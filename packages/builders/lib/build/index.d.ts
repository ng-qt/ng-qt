import { JsonObject } from '@angular-devkit/core';
import { BuildResult } from '@angular-devkit/build-webpack';
import { BuildOptions } from './types';
export declare type NodeBuildEvent = BuildResult & {
  outfile: string;
};
declare const _default: import('@angular-devkit/architect/src/internal').Builder<JsonObject & BuildOptions>;
export default _default;
