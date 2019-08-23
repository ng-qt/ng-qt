import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { JsonObject, workspaces } from '@angular-devkit/core';
import { BuildResult, runWebpack } from '@angular-devkit/build-webpack';
import { from, Observable } from 'rxjs';
import { BuildOptions } from './types';
import { map } from 'rxjs/operators';
import { createWebpackConfig } from './create-webpack-config';

export type NodeBuildEvent = BuildResult & {
  outfile: string;
};

async function getSourceRoot(context: BuilderContext) {
  const host = new NodeJsSyncHost();
  const workspaceHost = workspaces.createWorkspaceHost(host);
  const { workspace } = await workspaces.readWorkspace(
    context.workspaceRoot,
    workspaceHost,
  );

  const { sourceRoot } = workspace.projects.get(context.target!.project)!;
  if (!sourceRoot) {
    context.reportStatus('Error');
    const message = `${
      context.target!.project
    } does not have a sourceRoot. Please define one.`;
    context.logger.error(message);
    throw new Error(message);
  }

  return sourceRoot;
}

export default createBuilder((options: JsonObject & BuildOptions, context: BuilderContext): Observable<NodeBuildEvent> => {
  return from(getSourceRoot(context)).pipe(
    map(() => {
      const config = createWebpackConfig(options);
    })
  );
  /*
    angularCompilerOptions: {
      enableResourceInlining: true
    }
  **/
});