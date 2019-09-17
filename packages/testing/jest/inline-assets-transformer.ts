import * as ts from 'typescript';

/** Angular component decorator TemplateUrl property name */
const TEMPLATE_URL = 'templateUrl';
/** Angular component decorator StyleUrls property name */
const STYLE_URLS = 'styleUrls';
/** Angular component decorator Template property name */
const TEMPLATE = 'template';
/** Angular component decorator Styles property name */
const STYLES = 'styles';

const REQUIRE = 'require';

/**
 * Property names anywhere in an angular project to transform
 */
const TRANSFORM_PROPS = [TEMPLATE_URL, STYLE_URLS];

export const name = 'ng-qt-testing-inline-assets';

export const version = 1;

export function factory() {
  /**
   * Traverses the AST down to the relevant assignments anywhere in the file
   * and returns a boolean indicating if it should be transformed.
   */
  function isPropertyAssignmentToTransform(
    node: ts.Node,
  ): node is ts.PropertyAssignment {
    return (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      TRANSFORM_PROPS.includes(node.name.text)
    );
  }

  /**
   * Clones the assignment and manipulates it depending on its name.
   */
  function transformPropertyAssignmentForJest(node: ts.PropertyAssignment) {
    const mutableAssignment = ts.getMutableClone(node);

    function createRequireCall(pathLiteral: ts.Expression) {
      if (ts.isStringLiteral(pathLiteral)) {
        // match if it does not start with ./ or ../ or /
        if (pathLiteral.text && !pathLiteral.text.match(/^(\.\/|\.\.\/|\/)/)) {
          // make path relative by prepending './'
          pathLiteral = ts.createStringLiteral(`./${pathLiteral.text}`);
        }
      }

      return ts.createCall(ts.createIdentifier(REQUIRE), undefined, [
        pathLiteral,
      ]);
    }

    const assignmentNameText = (mutableAssignment.name as ts.Identifier).text;
    const pathLiteral = mutableAssignment.initializer;
    switch (assignmentNameText) {
      case TEMPLATE_URL:
        if (ts.isStringLiteral(pathLiteral)) {
          mutableAssignment.name = ts.createIdentifier(TEMPLATE);
          mutableAssignment.initializer = createRequireCall(pathLiteral);
        }
        break;

      case STYLE_URLS:
        if (ts.isArrayLiteralExpression(pathLiteral)) {
          mutableAssignment.name = ts.createIdentifier(STYLES);
          mutableAssignment.initializer = ts.createArrayLiteral(
            pathLiteral.elements.reduce(
              (literals, literal) => {
                const styleRequire = createRequireCall(literal);
                return [...literals, styleRequire];
              },
              [] as ts.Expression[],
            ),
          );
        }
        break;
    }

    return mutableAssignment;
  }

  function createVisitor(ctx: ts.TransformationContext) {
    /**
     * Our main visitor, which will be called recursively for each node in the source file's AST
     * @param node The node to be visited
     */
    const visitor: ts.Visitor = node => {
      let resultNode = node;

      // before we create a deep clone to modify, we make sure that
      // this is an assignment which we want to transform
      if (isPropertyAssignmentToTransform(node)) {
        // get transformed node with changed properties
        resultNode = transformPropertyAssignmentForJest(node);
      }

      // look for interesting assignments inside this node in any case
      resultNode = ts.visitEachChild(resultNode, visitor, ctx);

      // finally return the currently visited node
      return resultNode;
    };
    return visitor;
  }

  return (ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile> => (
    sf: ts.SourceFile,
  ) => ts.visitNode(sf, createVisitor(ctx));
}
