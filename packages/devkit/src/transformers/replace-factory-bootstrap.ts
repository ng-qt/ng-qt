// https://github.com/NativeScript/nativescript-dev-webpack/blob/master/transformers/ns-replace-bootstrap.ts
import { dirname, relative } from 'path';
import * as ts from 'typescript';
import { AngularCompilerPlugin } from '@ngtools/webpack';
import {
  collectDeepNodes,
  getFirstNode,
  insertStarImport,
  makeTransform,
  ReplaceNodeOperation,
  StandardTransform,
  TransformOperation,
} from '@ngtools/webpack/src/transformers';

import {
  getExpressionName,
  getResolvedEntryModule,
  NG_FACTORY_EXT,
  NG_STYLE_EXT,
  normalizeFactoryPath,
} from '../utils';

export function replaceFactoryBootstrap(
  getNgCompiler: () => AngularCompilerPlugin,
): ts.TransformerFactory<ts.SourceFile> {
  const shouldTransform = fileName =>
    !fileName.endsWith(NG_FACTORY_EXT) && !fileName.endsWith(NG_STYLE_EXT);
  const getTypeChecker = () => getNgCompiler().typeChecker;

  const standardTransform: StandardTransform = (sourceFile: ts.SourceFile) => {
    const ops: TransformOperation[] = [];
    const ngCompiler = getNgCompiler();
    // TODO: use something public when available
    const enableIvy =
      (<any>ngCompiler)._compilerOptions &&
      (<any>ngCompiler)._compilerOptions.enableIvy;
    const entryModule = getResolvedEntryModule(ngCompiler);

    if (!shouldTransform(sourceFile.fileName) || !entryModule) {
      return ops;
    }

    // Find all identifiers.
    const entryModuleIdentifiers = collectDeepNodes<ts.Identifier>(
      sourceFile,
      ts.SyntaxKind.Identifier,
    ).filter(identifier => identifier.text === entryModule.className);

    if (entryModuleIdentifiers.length === 0) {
      return [];
    }

    const relativeEntryModulePath = relative(
      dirname(sourceFile.fileName),
      entryModule.path,
    );
    const normalizedEntryModulePath = `./${relativeEntryModulePath}`.replace(
      /\\/g,
      '/',
    );

    // Find the bootstrap calls.
    entryModuleIdentifiers.forEach(entryModuleIdentifier => {
      // Figure out if it's a `platformNativeScriptDynamic().bootstrapModule(AppModule)` call.
      if (
        !(
          entryModuleIdentifier.parent &&
          entryModuleIdentifier.parent.kind === ts.SyntaxKind.CallExpression
        )
      ) {
        return;
      }

      const bootstrapCallExpr = entryModuleIdentifier.parent as ts.CallExpression;

      if (
        bootstrapCallExpr.expression.kind !==
        ts.SyntaxKind.PropertyAccessExpression
      ) {
        return;
      }

      const bootstrapPropAccessExpr = bootstrapCallExpr.expression as ts.PropertyAccessExpression;

      if (
        bootstrapPropAccessExpr.name.text !== 'bootstrapModule' ||
        bootstrapPropAccessExpr.expression.kind !== ts.SyntaxKind.CallExpression
      ) {
        return;
      }

      const nsPlatformCallExpr = bootstrapPropAccessExpr.expression as ts.CallExpression;
      if (
        !(
          getExpressionName(nsPlatformCallExpr.expression) ===
          'platformNgQtDynamic'
        )
      ) {
        return;
      }

      const idPlatform = ts.createUniqueName('ɵqt1');
      const idNgFactory = ts.createUniqueName('ɵqt2');

      const firstNode = getFirstNode(sourceFile);

      const factoryClassName = enableIvy
        ? entryModule.className
        : entryModule.className + 'NgFactory';
      const factoryModulePath = enableIvy
        ? normalizedEntryModulePath
        : normalizeFactoryPath(normalizedEntryModulePath);

      const newBootstrapPropAccessExpr = ts.getMutableClone(
        bootstrapPropAccessExpr,
      );
      const newNsPlatformCallExpr = ts.getMutableClone(
        bootstrapPropAccessExpr.expression,
      ) as ts.CallExpression;
      newNsPlatformCallExpr.expression = ts.createPropertyAccess(
        idPlatform,
        'platformNgQt',
      );
      newBootstrapPropAccessExpr.expression = newNsPlatformCallExpr;
      newBootstrapPropAccessExpr.name = enableIvy
        ? ts.createIdentifier('bootstrapModule')
        : ts.createIdentifier('bootstrapModuleFactory');

      const newBootstrapCallExpr = ts.getMutableClone(bootstrapCallExpr);
      newBootstrapCallExpr.expression = newBootstrapPropAccessExpr;
      newBootstrapCallExpr.arguments = ts.createNodeArray([
        ts.createPropertyAccess(
          idNgFactory,
          ts.createIdentifier(factoryClassName),
        ),
      ]);

      ops.push(
        // Insert an import of the {N} Angular static bootstrap module in the beginning of the file:
        // import * as __NgCli_bootstrap_2 from "nativescript-angular/platform-static";
        ...insertStarImport(
          sourceFile,
          idPlatform,
          '@ng-qt/platform/static',
          firstNode,
          true,
        ),

        // Insert an import of the module factory in the beginning of the file:
        // import * as __NgCli_bootstrap_1 from "./app.module.ngfactory";
        ...insertStarImport(
          sourceFile,
          idNgFactory,
          factoryModulePath,
          firstNode,
          true,
        ),

        // Replace the bootstrap call expression. For example:
        // from: platformNativeScriptDynamic().bootstrapModule(AppModule);
        // to:   platformNativeScript().bootstrapModuleFactory(__NgCli_bootstrap_2.AppModuleNgFactory);
        new ReplaceNodeOperation(
          sourceFile,
          bootstrapCallExpr,
          newBootstrapCallExpr,
        ),
      );
    });

    return ops;
  };

  return makeTransform(standardTransform, getTypeChecker);
}
