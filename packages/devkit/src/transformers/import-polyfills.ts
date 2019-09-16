import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as ts from 'typescript';
import {
  getFirstNode,
  makeTransform,
  StandardTransform,
  TransformOperation,
} from '@ngtools/webpack/src/transformers';

import { BuildOptions } from '../builders/build/build-options.interface';
import { insertAllImport } from '../utils';

export function importPolyfills(
  getNgCompiler: () => AngularCompilerPlugin,
  options: BuildOptions,
): ts.TransformerFactory<ts.SourceFile> {
  const getTypeChecker = () => getNgCompiler().typeChecker;

  const standardTransform: StandardTransform = (sourceFile: ts.SourceFile) => {
    const ops: TransformOperation[] = [];

    if (options.main === sourceFile.fileName) {
      const firstNode = getFirstNode(sourceFile);

      ops.push(
        ...insertAllImport(sourceFile, 'reflect-metadata', firstNode, true),
        ...insertAllImport(
          sourceFile,
          'zone.js/dist/zone-node',
          firstNode,
          true,
        ),
      );
    }

    return ops;
  };

  return makeTransform(standardTransform, getTypeChecker);
}
