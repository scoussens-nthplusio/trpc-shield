import type { MiddlewareFunction, ProcedureParams } from '@trpc/server';
import type { AnyRootConfig } from '@trpc/server/dist/core/internals/config';
import { allow } from './constructors';
import { generateMiddlewareFromRuleTree } from './generator';
import type { IFallbackErrorType, IOptions, IOptionsConstructor, IRules, ShieldRule } from './types';
import { withDefault } from './utils';
import { ValidationError, validateRuleTree } from './validation';

/**
 *
 * @param options
 *
 * Makes sure all of defined rules are in accord with the options
 * shield can process.
 *
 */
function normalizeOptions<TContext extends Record<string, any>>(options: IOptionsConstructor<TContext>): IOptions<TContext> {
  if (typeof options.fallbackError === 'string') {
    options.fallbackError = new Error(options.fallbackError);
  }

  return {
    debug: options.debug !== undefined ? options.debug : false,
    allowExternalErrors: withDefault(false)(options.allowExternalErrors),
    fallbackRule: withDefault<ShieldRule<TContext>>(allow)(options.fallbackRule),
    fallbackError: withDefault<IFallbackErrorType<TContext>>(new Error('Not Authorised!'))(options.fallbackError),
  };
}

/**
 *
 * @param ruleTree
 * @param options
 *
 * Validates rules and generates middleware from defined rule tree.
 *
 */
/* 
$types, 
*/
export function shield<
  TContext extends Record<string, any>,
  TConfig extends AnyRootConfig = AnyRootConfig,
  TContextOut = TContext,
  TInputIn = unknown,
  TInputOut = unknown,
  TOutputIn = unknown,
  TOutputOut = unknown,
  TMeta = unknown,
>(
  ruleTree: IRules<TContext>,
  options: IOptionsConstructor<TContext> = {},
): MiddlewareFunction<
  ProcedureParams<TConfig, TContextOut, TInputIn, TInputOut, TOutputIn, TOutputOut, TMeta>,
  ProcedureParams<TConfig, TContextOut, TInputIn, TInputOut, TOutputIn, TOutputOut, TMeta>
> {
  const normalizedOptions = normalizeOptions(options);
  const ruleTreeValidity = validateRuleTree(ruleTree);

  if (ruleTreeValidity.status === 'ok') {
    return generateMiddlewareFromRuleTree(ruleTree, normalizedOptions) as any;
  } else {
    throw new ValidationError(ruleTreeValidity.message);
  }
}
