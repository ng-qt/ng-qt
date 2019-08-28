import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost, TestProjectHost } from '@angular-devkit/architect/testing';
import { getSystemPath, join, normalize, schema, workspaces } from '@angular-devkit/core';
import { WorkspaceNodeModulesArchitectHost } from '@angular-devkit/architect/node';

describe('NGQT Build', () => {
  const target = { project: 'app', target: 'server' };

  let architect: Architect;
  let architectHost: TestingArchitectHost;
  let host: TestProjectHost;

  beforeEach(async () => {
    const devkitRoot = normalize(process.cwd());
    const workspaceRoot = join(devkitRoot, '../../integration/hello-world-app');
    host = new TestProjectHost(workspaceRoot);
    await host.initialize().toPromise();

    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);
    const workspaceSysPath = getSystemPath(host.root());

    const { workspace } = await workspaces.readWorkspace(
      workspaceSysPath,
      workspaces.createWorkspaceHost(host),
    );

    architectHost = new TestingArchitectHost(
      workspaceSysPath,
      workspaceSysPath,
      new WorkspaceNodeModulesArchitectHost(workspace, workspaceSysPath),
    );

    architect = new Architect(architectHost, registry);
  });

  afterEach(() => host.restore().toPromise());

  it('should do some stuff', async () => {
    const run = await architect.scheduleTarget(target);
    const output = await run.result;
    console.log(output);
  });
});
