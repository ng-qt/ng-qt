import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { runWebpack } from '@angular-devkit/build-webpack';
import { from } from 'rxjs';

export default createBuilder((options: any, context: BuilderContext) => {
  const host = new NodeJsSyncHost();
  const root = context.workspaceRoot;

  return from(buildS)
  /*
    angularCompilerOptions: {
      enableResourceInlining: true
    }
  **/
});