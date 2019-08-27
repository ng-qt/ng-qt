"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
/** Angular component decorator Styles property name */
const STYLES = 'styles';
/** Angular component decorator name */
const COMPONENT = 'Component';
/** All props to be transformed inside a decorator */
const TRANSFORM_IN_DECORATOR_PROPS = [STYLES];
/**
 * Transformer ID
 * @internal
 */
exports.name = 'angular-component-strip-styles';
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
function stripStylesTransformer(cs) {
    /**
     * Traverses the AST down inside a decorator to a styles assignment
     * and returns a boolean indicating if it should be transformed.
     */
    function isInDecoratorPropertyAssignmentToTransform(node) {
        return getInDecoratorPropertyAssignmentsToTransform(node).length > 0;
    }
    /**
     * Traverses the AST down inside a decorator to a styles assignment
     * returns it in an array.
     */
    function getInDecoratorPropertyAssignmentsToTransform(node) {
        if (!ts.isClassDeclaration(node) || !node.decorators) {
            return [];
        }
        return node.decorators
            .map(dec => dec.expression)
            .filter(ts.isCallExpression)
            .filter(callExpr => ts.isCallExpression(callExpr) && ts.isIdentifier(callExpr.expression) && callExpr.expression.getText() === COMPONENT)
            .reduce((acc, nxtCallExpr) => Array.prototype.concat.apply(acc, nxtCallExpr.arguments
            .filter(ts.isObjectLiteralExpression)
            .reduce((acc, nxtArg) => Array.prototype.concat.apply(acc, nxtArg.properties
            .filter(ts.isPropertyAssignment)
            .filter(propAss => ts.isIdentifier(propAss.name) &&
            TRANSFORM_IN_DECORATOR_PROPS.includes(propAss.name.text))), [])), []);
    }
    /**
     * Clones the styles assignment and manipulates it.
     * @param node the property assignment to change
     */
    function transfromStylesAssignmentForJest(node) {
        const mutableNode = ts.getMutableClone(node);
        const assignments = getInDecoratorPropertyAssignmentsToTransform(mutableNode);
        assignments.forEach(assignment => {
            if (assignment.name.text === STYLES) {
                // replace initializer array with empty array
                assignment.initializer = ts.createArrayLiteral();
            }
        });
        return mutableNode;
    }
    /**
     * Create a source file visitor which will visit all nodes in a source file
     * @param ctx The typescript transformation context
     * @param _ The owning source file
     */
    function createVisitor(ctx, _) {
        /**
         * Main visitor, which will be called recursively for each node in the source file's AST
         * @param node The node to be visited
         */
        const visitor = node => {
            // before we create a deep clone to modify, we make sure that
            // this is an assignment which we want to transform
            if (isInDecoratorPropertyAssignmentToTransform(node)) {
                // get transformed node with changed properties
                return transfromStylesAssignmentForJest(node);
            }
            else {
                // else look for assignments inside this node recursively
                return ts.visitEachChild(node, visitor, ctx);
            }
        };
        return visitor;
    }
    return (ctx) => (sf) => ts.visitNode(sf, createVisitor(ctx, sf));
}
exports.stripStylesTransformer = stripStylesTransformer;
