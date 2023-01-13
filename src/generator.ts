import { IOptions, IRules } from './types';

/**
 *
 * @param ruleTree
 * @param options
 *
 * Generates middleware from given rules.
 *
 */
export function generateMiddlewareFromRuleTree<TContext extends Record<string, unknown>>(
  ruleTree: IRules<TContext>,
  options: IOptions<TContext>,
) {
  return ({
    next,
    ctx,
    type,
    path,
    input,
    rawInput,
  }: {
    next: Function;
    ctx: { [name: string]: any };
    type: string;
    path: string;
    input: { [name: string]: any };
    rawInput: unknown;
  }) => {
    const opWithPath: Array<string> = path.split('.');
    const opName: string = opWithPath[opWithPath.length - 1];
    const keys = Object.keys(ruleTree);
    let rule;
    if (keys.includes('query') || keys.includes('mutation')) {
      rule = ruleTree?.[type]?.[opName] || options.fallbackRule;
    } else {
      for (const key of keys) {
        const namespace = ruleTree[key];
        if (namespace?.[type]?.[opName]) {
          rule = namespace?.[type]?.[opName] || options.fallbackRule;
          break;
        }
      }
    }

    if (rule) {
      return rule?.resolve(ctx, type, path, input, rawInput, options).then((result: any) => {
        if (!result) throw options.fallbackError;
        return next();
      });
    }
    return next();
  };
}
