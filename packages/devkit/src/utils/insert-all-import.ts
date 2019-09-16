import * as ts from 'typescript';
import {
  AddNodeOperation,
  collectDeepNodes,
  getFirstNode,
  TransformOperation,
} from '@ngtools/webpack/src/transformers';

export function insertAllImport(
  sourceFile: ts.SourceFile,
  modulePath: string,
  target?: ts.Node,
  before = false,
): TransformOperation[] {
  const ops: TransformOperation[] = [];
  const allImports = collectDeepNodes(
    sourceFile,
    ts.SyntaxKind.ImportDeclaration,
  );

  const newImport = ts.createImportDeclaration(
    undefined,
    undefined,
    undefined,
    ts.createLiteral(modulePath),
  );

  if (target) {
    ops.push(
      new AddNodeOperation(
        sourceFile,
        target,
        before ? newImport : undefined,
        before ? undefined : newImport,
      ),
    );
  } else if (allImports.length > 0) {
    ops.push(
      new AddNodeOperation(
        sourceFile,
        allImports[allImports.length - 1],
        undefined,
        newImport,
      ),
    );
  } else {
    const firstNode = getFirstNode(sourceFile);
    if (firstNode) {
      ops.push(new AddNodeOperation(sourceFile, firstNode, newImport));
    }
  }

  return ops;
}
