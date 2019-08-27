"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const node_1 = require("@angular-devkit/core/node");
const core_1 = require("@angular-devkit/core");
const build_webpack_1 = require("@angular-devkit/build-webpack");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const create_webpack_config_1 = require("./create-webpack-config");
const utils_1 = require("./utils");
async function getSourceRoot(context) {
    const host = new node_1.NodeJsSyncHost();
    const workspaceHost = core_1.workspaces.createWorkspaceHost(host);
    const { workspace } = await core_1.workspaces.readWorkspace(context.workspaceRoot, workspaceHost);
    const { sourceRoot } = workspace.projects.get(context.target.project);
    if (!sourceRoot) {
        context.reportStatus('Error');
        const message = `${context.target.project} does not have a sourceRoot. Please define one.`;
        context.logger.error(message);
        throw new Error(message);
    }
    return sourceRoot;
}
exports.default = architect_1.createBuilder((options, context) => {
    return rxjs_1.from(getSourceRoot(context)).pipe(operators_1.map(sourceRoot => utils_1.normalizeBuildOptions(options, context.workspaceRoot, sourceRoot)), operators_1.map(options => {
        let config = create_webpack_config_1.createWebpackConfig(options);
        if (options.webpackConfig) {
            config = require(options.webpackConfig)(config, {
                options,
                configuration: context.target.configuration
            });
        }
        return config;
    }), 
    // @ts-ignore
    operators_1.concatMap(config => 
    // @ts-ignore
    build_webpack_1.runWebpack(config, context, {
        logging: stats => {
            context.logger.info(stats.toString(config.stats));
        }
    })), operators_1.map((buildEvent) => {
        buildEvent.outfile = core_1.resolve(context.workspaceRoot, options.outputPath + '/main.js');
        return buildEvent;
    }));
});
