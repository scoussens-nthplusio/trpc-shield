import { allow, rule, shield } from '../../../dist'
import { Context } from '../../src/context'

const isAuthenticated = rule<Context>()(async (ctx, type, path, input, rawInput) => {
  return ctx.user !== null
})

export const permissions = shield<Context>({
  query: {
    aggregateUser: allow,
    findFirstUser: allow,
    findManyUser: isAuthenticated,
    findUniqueUser: allow,
    groupByUser: allow,
  },
  mutation: {
    createOneUser: allow,
    deleteManyUser: allow,
    deleteOneUser: allow,
    updateManyUser: allow,
    updateOneUser: allow,
    upsertOneUser: allow,
  },
})
