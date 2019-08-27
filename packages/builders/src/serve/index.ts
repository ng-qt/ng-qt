import { ChildProcess, spawn } from 'child_process';
import * as treeKill from 'tree-kill';
import { stripIndents } from '@angular-devkit/core/src/utils/literals';
import { JsonObject } from '@angular-devkit/core';
import { Observable, bindCallback, of, zip, from } from 'rxjs';
import { concatMap, tap, mapTo, first, map, filter } from 'rxjs/operators';
import {
  BuilderContext,
  createBuilder,
  BuilderOutput,
  targetFromTargetString,
  scheduleTargetAndForget,
} from '@angular-devkit/architect';

import { NodeBuildEvent } from '../build';

try {
  require('dotenv').config();
} catch (e) {}

export const enum InspectType {
  Inspect = 'inspect',
  InspectBrk = 'inspect-brk',
}

export interface NodeExecuteBuilderOptions extends JsonObject {
  inspect: boolean | InspectType;
  args: string[];
  waitUntilTargets: string[];
  buildTarget: string;
  host: string;
  port: number;
}

export default createBuilder<NodeExecuteBuilderOptions>(
  (options: NodeExecuteBuilderOptions, context: BuilderContext) => {
    return runWaitUntilTargets(options, context).pipe(
      concatMap(({ success }) => {
        if (!success) {
          context.logger.error(`One of the tasks specified in waitUntilTargets failed`);

          return of({ success });
        }

        return startBuild(options, context).pipe(
          concatMap((event: NodeBuildEvent) => {
            if (event.success) {
              return restartProcess(event.outFile, options, context).pipe(mapTo(event));
            } else {
              context.logger.error('There was an error with the build. See above.');
              context.logger.info(`${event.outFile} was not restarted.`);

              return of(event);
            }
          }),
        );
      }),
    );
  },
);

let subProcess: ChildProcess | null;

function runProcess(file: string, options: NodeExecuteBuilderOptions, context: BuilderContext) {
  if (subProcess) {
    throw new Error('Already running');
  }

  const args = [...getExecArgv(options), ...options.args];

  subProcess = spawn('qode', [...args, file]);

  subProcess.stdout!.on('data', data => context.logger.info(data.toString()));
  subProcess.stderr!.on('data', err => context.logger.error(err.toString()));
  /*subProcess.once('exit', (code) => {
    if (code === 0) {
      process.exit();
    }
  });*/
}

function getExecArgv(options: NodeExecuteBuilderOptions): string[] {
  const args: string[] = [];
  // const args = ['-r', 'source-map-support/register'];

  if (options.inspect === true) {
    options.inspect = InspectType.Inspect;
  }

  if (options.inspect) {
    args.push(`--${options.inspect}=${options.port}`);
  }

  return args;
}

function restartProcess(file: string, options: NodeExecuteBuilderOptions, context: BuilderContext) {
  return killProcess(context).pipe(
    tap(() => {
      runProcess(file, options, context);
    }),
  );
}

function killProcess(context: BuilderContext): Observable<void | Error> {
  if (!subProcess) {
    return of(undefined);
  }

  // @ts-ignore
  const observableTreeKill = bindCallback<number, string, Error>(treeKill);
  return observableTreeKill(subProcess.pid, 'SIGTERM').pipe(
    tap((err: any) => {
      subProcess = null;
      if (err) {
        if (Array.isArray(err) && err[0] && err[2]) {
          const errorMessage = err[2];
          context.logger.error(errorMessage);
        } else if (err.message) {
          context.logger.error(err.message);
        }
      }
    }),
  );
}

function startBuild(
  options: NodeExecuteBuilderOptions,
  context: BuilderContext,
): Observable<NodeBuildEvent> {
  const target = targetFromTargetString(options.buildTarget);
  return from(
    Promise.all([context.getTargetOptions(target), context.getBuilderNameForTarget(target)]).then(
      ([options, builderName]) => context.validateOptions(options, builderName),
    ),
  ).pipe(
    tap(options => {
      if (options.optimization) {
        context.logger.warn(stripIndents`
            ************************************************
            This is a simple process manager for use in
            testing or debugging Node applications locally.
            DO NOT USE IT FOR PRODUCTION!
            You should look into proper means of deploying
            your node application to production.
            ************************************************`);
      }
    }),
    concatMap(
      () =>
        // @ts-ignore
        scheduleTargetAndForget(context, target, {
          watch: true,
        }) as Observable<NodeBuildEvent>,
    ),
  );
}

function runWaitUntilTargets(
  options: NodeExecuteBuilderOptions,
  context: BuilderContext,
): Observable<BuilderOutput> {
  if (!options.waitUntilTargets || options.waitUntilTargets.length === 0)
    return of({ success: true });

  return zip(
    ...options.waitUntilTargets.map(b => {
      return scheduleTargetAndForget(context, targetFromTargetString(b)).pipe(
        // @ts-ignore
        filter(e => e.success !== undefined),
        first(),
      );
    }),
  ).pipe(
    map(results => {
      // @ts-ignore
      return { success: !results.some(r => !r.success) };
    }),
  );
}
