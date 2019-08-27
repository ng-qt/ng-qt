"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const path_1 = require("path");
const fs_1 = require("fs");
function normalizeBuildOptions(options, root, sourceRoot) {
    return {
        ...options,
        root: root,
        sourceRoot: sourceRoot,
        main: path_1.resolve(root, options.main),
        outputPath: path_1.resolve(root, options.outputPath),
        tsConfig: path_1.resolve(root, options.tsConfig),
        fileReplacements: normalizeFileReplacements(root, options.fileReplacements),
        assets: normalizeAssets(options.assets, root, sourceRoot),
        webpackConfig: options.webpackConfig
            ? path_1.resolve(root, options.webpackConfig)
            : options.webpackConfig
    };
}
exports.normalizeBuildOptions = normalizeBuildOptions;
function normalizeAssets(assets, root, sourceRoot) {
    return assets.map(asset => {
        if (typeof asset === 'string') {
            const assetPath = core_1.normalize(asset);
            const resolvedAssetPath = path_1.resolve(root, assetPath);
            const resolvedSourceRoot = path_1.resolve(root, sourceRoot);
            if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
                throw new Error(`The ${resolvedAssetPath} asset path must start with the project source root: ${sourceRoot}`);
            }
            const isDirectory = fs_1.statSync(resolvedAssetPath).isDirectory();
            const input = isDirectory
                ? resolvedAssetPath
                : path_1.dirname(resolvedAssetPath);
            const output = path_1.relative(resolvedSourceRoot, path_1.resolve(root, input));
            const glob = isDirectory ? '**/*' : path_1.basename(resolvedAssetPath);
            return {
                input,
                output,
                glob
            };
        }
        else {
            if (asset.output.startsWith('..')) {
                throw new Error('An asset cannot be written to a location outside of the output path.');
            }
            const assetPath = core_1.normalize(asset.input);
            const resolvedAssetPath = path_1.resolve(root, assetPath);
            return {
                ...asset,
                input: resolvedAssetPath,
                // Now we remove starting slash to make Webpack place it from the output root.
                output: asset.output.replace(/^\//, '')
            };
        }
    });
}
function normalizeFileReplacements(root, fileReplacements) {
    return fileReplacements.map(fileReplacement => ({
        replace: path_1.resolve(root, fileReplacement.replace),
        with: path_1.resolve(root, fileReplacement.with)
    }));
}
