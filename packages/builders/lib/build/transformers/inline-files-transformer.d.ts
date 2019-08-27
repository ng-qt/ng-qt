import * as ts from 'typescript';
import { Program } from 'typescript';
/**
 * Transformer ID
 * @internal
 */
/**
 * Transformer Version
 * @internal
 */
/**
 * The factory of hoisting transformer factory
 * @internal
 */
export declare function inlineFilesTransformer(
  cs: Program,
): (ctx: ts.TransformationContext) => ts.Transformer<ts.SourceFile>;
