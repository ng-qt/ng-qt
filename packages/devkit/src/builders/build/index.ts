import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { JsonObject, resolve, workspaces } from '@angular-devkit/core';
import { BuildResult, runWebpack } from '@angular-devkit/build-webpack';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as mergeWebpack from 'webpack-merge';
import { Configuration } from 'webpack';

import { BuildOptionsUnion, isAotBuild } from './types';
import {
  normalizeNodeBuildOptions,
  normalizeBaseBuildOptions,
  normalizeAotBuildOptions,
  getBaseWebpackConfig,
  getNodeWebpackConfig,
  getAotWebpackConfig,
} from '../../utils';

export type NodeBuildEvent = BuildResult & {
  outFile: string;
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

export default createBuilder(
  (
    options: JsonObject & BuildOptionsUnion,
    context: BuilderContext,
  ): Observable<NodeBuildEvent> => {
    return from(getSourceRoot(context)).pipe(
      map(sourceRoot =>
        normalizeBaseBuildOptions(options, context.workspaceRoot, sourceRoot),
      ),
      map(options => {
        const baseConfig = getBaseWebpackConfig(options);
        let config: Configuration;

        if (isAotBuild(options)) {
          const aotOptions = normalizeAotBuildOptions(
            options,
            context.workspaceRoot,
          );
          config = getAotWebpackConfig(aotOptions);
        } else {
          const nodeOptions = normalizeNodeBuildOptions(
            options,
            context.workspaceRoot,
          );
          config = getNodeWebpackConfig(nodeOptions);
        }

        config = mergeWebpack([baseConfig, config]);

        if (options.webpackConfig) {
          config = require(options.webpackConfig)(config, {
            options,
            configuration: context.target!.configuration,
          });
        }

        return config;
      }),
      concatMap(config =>
        runWebpack(config, context, {
          logging: stats => {
            context.logger.info(stats.toString(config.stats));
          },
        }),
      ),
      map((buildEvent: BuildResult) => {
        buildEvent.outFile = resolve(
          context.workspaceRoot as any,
          (options.outputPath + '/main.js') as any,
        );

        return buildEvent as NodeBuildEvent;
      }),
    );
  },
);
