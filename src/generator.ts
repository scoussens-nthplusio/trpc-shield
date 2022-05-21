import { IRules, IOptions } from "./types";

/**
 *
 * @param ruleTree
 * @param options
 *
 * Generates middleware from given rules.
 *
 */
export function generateMiddlewareFromRuleTree<
  TSource = any,
  TContext = any,
  TArgs = any
>(ruleTree: IRules, options: IOptions) {
  return async ({ next, ctx, type, path, rawInput }: { next: Function, ctx: { [name: string]: any }, type: string, path: string, rawInput: string }) => {
    const opWithPath: Array<string> = path.split(".");
    const opName: string = opWithPath[opWithPath.length - 1];
    // @ts-ignore
    const rule = ruleTree?.[type]?.[opName];
    if (rule) {
      const result = await rule?.resolve(ctx, type, path, rawInput, options)
      if (!result) throw options.fallbackError
    }
    return next();
  }
}
