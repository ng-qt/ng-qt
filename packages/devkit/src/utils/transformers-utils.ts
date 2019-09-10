import { AngularCompilerPlugin } from '@ngtools/webpack';
import { workaroundResolve } from '@ngtools/webpack/src/utils';

export function getResolvedEntryModule(ngCompiler: AngularCompilerPlugin) {
  return ngCompiler.entryModule
    ? {
        path: workaroundResolve(ngCompiler.entryModule.path),
        className: ngCompiler.entryModule.className,
      }
    : ngCompiler.entryModule;
}
