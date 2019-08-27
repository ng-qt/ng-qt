import * as ts from 'typescript';
import { Program } from 'typescript';
/**
 * Transformer ID
 * @internal
 */
export declare const name = 'angular-component-strip-styles';
/**
 * Transformer Version
 * @internal
 */
/**
 * The factory of hoisting transformer factory
 * @internal
 */
export declare function stripStylesTransformer(
  cs: Program,
): (ctx: ts.TransformationContext) => ts.Transformer<ts.SourceFile>;
