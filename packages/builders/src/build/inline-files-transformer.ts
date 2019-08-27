// only import types, for the rest use injected `ConfigSet.compilerModule`
import * as ts from 'typescript';
import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import {
  Node,
  SourceFile,
  TransformationContext,
  Transformer,
  Visitor,
  PropertyAssignment,
  Identifier,
  Program,
  TransformerFactory,
} from 'typescript';

// replace original ts-jest ConfigSet with this simple interface, as it would require
// jest-preset-angular to add several babel devDependencies to get the other types
// inside the ConfigSet right

/** Angular component decorator TemplateUrl property name */
const TEMPLATE_URL = 'templateUrl';
/** Angular component decorator StyleUrls property name */
const STYLE_URLS = 'styleUrls';
/** Angular component decorator Template property name */
const TEMPLATE = 'template';
/** Angular component decorator Styles property name */
const STYLES = 'styles';

/**
 * Property names anywhere in an angular project to transform
 */
const TRANSFORM_PROPS = [TEMPLATE_URL, STYLE_URLS];

/**
 * Transformer ID
 * @internal
 */
// export const name = 'angular-component-inline-files';

// increment this each time the code is modified
/**
 * Transformer Version
 * @internal
 */
// export const version = 1;

/**
 * The factory of hoisting transformer factory
 * @internal
 */
export function inlineFilesTransformer(cs: Program) {
  /**
   * Traverses the AST down to the relevant assignments anywhere in the file
   * and returns a boolean indicating if it should be transformed.
   */
  function isPropertyAssignmentToTransform(node: Node): node is PropertyAssignment {
    return ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && TRANSFORM_PROPS.includes(node.name.text);
  }

  /**
   * Clones the assignment and manipulates it depending on its name.
   */
  function transfromPropertyAssignmentForJest(node: PropertyAssignment, sf: SourceFile) {
    const mutableAssignment = ts.getMutableClone(node);

    function readComponentLiteral(literal: ts.StringLiteral) {
      return readFileSync(join(dirname(sf.fileName), literal.text)).toString();
    }

    const assignmentNameText = (mutableAssignment.name as Identifier).text;
    const pathLiteral = mutableAssignment.initializer;
    switch (assignmentNameText) {
      case TEMPLATE_URL:
        if (ts.isStringLiteral(pathLiteral)) {
          const template = readComponentLiteral(pathLiteral);
          mutableAssignment.name = ts.createIdentifier(TEMPLATE);
          mutableAssignment.initializer = ts.createStringLiteral(template);
        }
        break;

      case STYLE_URLS:
        if (ts.isArrayLiteralExpression(pathLiteral)) {
          mutableAssignment.name = ts.createIdentifier(STYLES);
          mutableAssignment.initializer = ts.createArrayLiteral(
            pathLiteral.elements.reduce(
              (literals, element) => {
                if (ts.isStringLiteral(element)) {
                  const style = readComponentLiteral(element);
                  const literal = ts.createStringLiteral(style);

                  return [...literals, literal];
                }

                return literals;
              },
              [] as ts.StringLiteral[],
            ),
          );
        }
        break;
    }

    return mutableAssignment;
  }

  function createVisitor(ctx: TransformationContext, sf: SourceFile) {
    /**
     * Our main visitor, which will be called recursively for each node in the source file's AST
     * @param node The node to be visited
     */
    const visitor: Visitor = node => {
      let resultNode = node;

      // before we create a deep clone to modify, we make sure that
      // this is an assignment which we want to transform
      if (isPropertyAssignmentToTransform(node)) {
        // get transformed node with changed properties
        resultNode = transfromPropertyAssignmentForJest(node, sf);
      }

      // look for interesting assignments inside this node in any case
      resultNode = ts.visitEachChild(resultNode, visitor, ctx);

      // finally return the currently visited node
      return resultNode;
    };
    return visitor;
  }

  return (ctx: TransformationContext): Transformer<SourceFile> => (sf: SourceFile) =>
    ts.visitNode(sf, createVisitor(ctx, sf));
}
