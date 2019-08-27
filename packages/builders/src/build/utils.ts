import { Path, normalize } from '@angular-devkit/core';
import { resolve, dirname, relative, basename } from 'path';
import { BuildOptions } from './types';
import { statSync } from 'fs';

export const replaceNewLineChars = (someString: string, replacementString = '') => {
  // defaults to just removing
  const LF = `\u{000a}`; // Line Feed (\n)
  const VT = `\u{000b}`; // Vertical Tab
  const FF = `\u{000c}`; // Form Feed
  const CR = `\u{000d}`; // Carriage Return (\r)
  const CRLF = `${CR}${LF}`; // (\r\n)
  const NEL = `\u{0085}`; // Next Line
  const LS = `\u{2028}`; // Line Separator
  const PS = `\u{2029}`; // Paragraph Separator
  const lineTerminators = [LF, VT, FF, CR, CRLF, NEL, LS, PS]; // all Unicode `lineTerminators`
  let finalString = someString.normalize(`NFD`); // better safe than sorry? Or is it?
  for (let lineTerminator of lineTerminators) {
    if (finalString.includes(lineTerminator)) {
      // check if the string contains the current `lineTerminator`
      let regex = new RegExp(lineTerminator.normalize(`NFD`), `gu`); // create the `regex` for the current `lineTerminator`
      finalString = finalString.replace(regex, replacementString); // perform the replacement
    }
  }
  return finalString.normalize(`NFC`); // return the `finalString` (without any Unicode `lineTerminators`)
};

export interface FileReplacement {
  replace: string;
  with: string;
}

export function normalizeBuildOptions<T extends BuildOptions>(options: T, root: string, sourceRoot: string): T {
  return {
    ...options,
    root: root,
    sourceRoot: sourceRoot,
    main: resolve(root, options.main),
    outputPath: resolve(root, options.outputPath),
    tsConfig: resolve(root, options.tsConfig),
    fileReplacements: normalizeFileReplacements(root, options.fileReplacements),
    assets: normalizeAssets(options.assets!, root, sourceRoot),
    webpackConfig: options.webpackConfig ? resolve(root, options.webpackConfig) : options.webpackConfig,
  };
}

function normalizeAssets(assets: any[], root: string, sourceRoot: string): any[] {
  return assets.map(asset => {
    if (typeof asset === 'string') {
      const assetPath = normalize(asset);
      const resolvedAssetPath = resolve(root, assetPath);
      const resolvedSourceRoot = resolve(root, sourceRoot);

      if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
        throw new Error(`The ${resolvedAssetPath} asset path must start with the project source root: ${sourceRoot}`);
      }

      const isDirectory = statSync(resolvedAssetPath).isDirectory();
      const input = isDirectory ? resolvedAssetPath : dirname(resolvedAssetPath);
      const output = relative(resolvedSourceRoot, resolve(root, input));
      const glob = isDirectory ? '**/*' : basename(resolvedAssetPath);
      return {
        input,
        output,
        glob,
      };
    } else {
      if (asset.output.startsWith('..')) {
        throw new Error('An asset cannot be written to a location outside of the output path.');
      }

      const assetPath = normalize(asset.input);
      const resolvedAssetPath = resolve(root, assetPath);
      return {
        ...asset,
        input: resolvedAssetPath,
        // Now we remove starting slash to make Webpack place it from the output root.
        output: asset.output.replace(/^\//, ''),
      };
    }
  });
}

function normalizeFileReplacements(root: string, fileReplacements: FileReplacement[]): FileReplacement[] {
  return fileReplacements.map(fileReplacement => ({
    replace: resolve(root, fileReplacement.replace),
    with: resolve(root, fileReplacement.with),
  }));
}
