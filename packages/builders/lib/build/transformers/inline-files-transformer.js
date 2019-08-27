'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// only import types, for the rest use injected `ConfigSet.compilerModule`
const ts = require('typescript');
// replace original ts-jest ConfigSet with this simple interface, as it would require
// jest-preset-angular to add several babel devDependencies to get the other types
// inside the ConfigSet right
/** Angular component decorator TemplateUrl property name */
const TEMPLATE_URL = 'templateUrl';
/** Angular component decorator StyleUrls property name */
const STYLE_URLS = 'styleUrls';
/** Angular component decorator Template property name */
const TEMPLATE = 'template';
/** Node require function name */
const REQUIRE = 'require';
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
function inlineFilesTransformer(cs) {
  /**
   * Traverses the AST down to the relevant assignments anywhere in the file
   * and returns a boolean indicating if it should be transformed.
   */
  function isPropertyAssignmentToTransform(node) {
    return ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && TRANSFORM_PROPS.includes(node.name.text);
  }
  /**
   * Clones the assignment and manipulates it depending on its name.
   * @param node the property assignment to change
   */
  function transfromPropertyAssignmentForJest(node) {
    const mutableAssignment = ts.getMutableClone(node);
    console.log(mutableAssignment.getChildAt(0).getText());
    const assignmentNameText = mutableAssignment.name.text;
    switch (assignmentNameText) {
      case TEMPLATE_URL:
        // replace 'templateUrl' with 'template'
        // reuse the right-hand-side literal (the filepath) from the assignment
        let pathLiteral = mutableAssignment.initializer;
        // fix templatePathLiteral if it was a non-relative path
        if (ts.isStringLiteral(pathLiteral)) {
          // match if it does not start with ./ or ../ or /
          if (pathLiteral.text && !pathLiteral.text.match(/^(\.\/|\.\.\/|\/)/)) {
            // make path relative by prepending './'
            pathLiteral = ts.createStringLiteral(`./${pathLiteral.text}`);
          }
        }
        // replace current initializer with require(path)
        const requireCall = ts.createCall(
          /* expression */ ts.createIdentifier(REQUIRE),
          /* type arguments */ undefined,
          /* arguments array */ [pathLiteral],
        );
        mutableAssignment.name = ts.createIdentifier(TEMPLATE);
        mutableAssignment.initializer = requireCall;
        break;
      case STYLE_URLS:
        // replace styleUrls value with emtpy array
        // inlining all urls would be way more complicated and slower
        mutableAssignment.initializer = ts.createArrayLiteral();
        break;
    }
    return mutableAssignment;
  }
  function createVisitor(ctx) {
    /**
     * Our main visitor, which will be called recursively for each node in the source file's AST
     * @param node The node to be visited
     */
    const visitor = node => {
      let resultNode = node;
      // before we create a deep clone to modify, we make sure that
      // this is an assignment which we want to transform
      if (isPropertyAssignmentToTransform(node)) {
        // get transformed node with changed properties
        resultNode = transfromPropertyAssignmentForJest(node);
      }
      // look for interesting assignments inside this node in any case
      resultNode = ts.visitEachChild(resultNode, visitor, ctx);
      // finally return the currently visited node
      return resultNode;
    };
    return visitor;
  }
  return ctx => sf => ts.visitNode(sf, createVisitor(ctx));
}
exports.inlineFilesTransformer = inlineFilesTransformer;
