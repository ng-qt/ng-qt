import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { JsonObject, resolve, workspaces } from '@angular-devkit/core';
import { BuildResult, runWebpack } from '@angular-devkit/build-webpack';
import { from, Observable } from 'rxjs';
import { BuildOptions } from './types';
import { concatMap, map } from 'rxjs/operators';
import { createWebpackConfig } from './create-webpack-config';
import { normalizeBuildOptions } from './utils';

export type NodeBuildEvent = BuildResult & {
  outfile: string;
};

async function getSourceRoot(context: BuilderContext) {
  const host = new NodeJsSyncHost();
  const workspaceHost = workspaces.createWorkspaceHost(host);
  const { workspace } = await workspaces.readWorkspace(context.workspaceRoot, workspaceHost);

  const { sourceRoot } = workspace.projects.get(context.target!.project)!;
  if (!sourceRoot) {
    context.reportStatus('Error');
    const message = `${context.target!.project} does not have a sourceRoot. Please define one.`;
    context.logger.error(message);
    throw new Error(message);
  }

  return sourceRoot;
}

export default createBuilder(
  (options: JsonObject & BuildOptions, context: BuilderContext): Observable<NodeBuildEvent> => {
    return from(getSourceRoot(context)).pipe(
      map(sourceRoot => normalizeBuildOptions(options, context.workspaceRoot, sourceRoot)),
      map(options => {
        let config = createWebpackConfig(options);
        if (options.webpackConfig) {
          config = require(options.webpackConfig)(config, {
            options,
            configuration: context.target!.configuration,
          });
        }
        return config;
      }),
      // @ts-ignore
      concatMap(config =>
        // @ts-ignore
        runWebpack(config, context, {
          logging: stats => {
            context.logger.info(stats.toString(config.stats));
          },
        }),
      ),
      map((buildEvent: BuildResult) => {
        buildEvent.outfile = resolve(context.workspaceRoot as any, (options.outputPath + '/main.js') as any);

        return buildEvent as NodeBuildEvent;
      }),
    );
  },
);
