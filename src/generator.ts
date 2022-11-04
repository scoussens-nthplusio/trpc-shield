import { IRules, IOptions } from './types'

/**
 *
 * @param ruleTree
 * @param options
 *
 * Generates middleware from given rules.
 *
 */
export function generateMiddlewareFromRuleTree(ruleTree: IRules, options: IOptions) {
  return ({
    next,
    ctx,
    type,
    path,
    rawInput,
  }: {
    next: Function
    ctx: { [name: string]: any }
    type: string
    path: string
    rawInput: unknown
  }) => {
    const opWithPath: Array<string> = path.split('.')
    const opName: string = opWithPath[opWithPath.length - 1]
    const rule = ruleTree?.[type]?.[opName] || options.fallbackRule;

    if (rule) {
      return rule?.resolve(ctx, type, path, rawInput, options).then((result: any) => {
        if (!result) throw options.fallbackError
        return next()
      })
    }
    return next()
  }
}
