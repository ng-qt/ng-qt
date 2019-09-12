import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as ts from 'typescript';
import {
  makeTransform,
  StandardTransform,
  TransformOperation,
} from '@ngtools/webpack/src/transformers';
import { AotBuildOptions } from '../builders/build/types';

export function importPolyfillsTransformer(
  getNgCompiler: () => AngularCompilerPlugin,
  options: AotBuildOptions,
): ts.TransformerFactory<ts.SourceFile> {
  const getTypeChecker = () => getNgCompiler().typeChecker;

  const standardTransform: StandardTransform = (sourceFile: ts.SourceFile) => {
    const ops: TransformOperation[] = [];
    const ngCompiler = getNgCompiler();

    console.log((ngCompiler as any)._mainPath);

    return ops;
  };

  return makeTransform(standardTransform, getTypeChecker);
}
