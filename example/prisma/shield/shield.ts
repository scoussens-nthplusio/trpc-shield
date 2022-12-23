import { allow, deny, shield } from '../../../dist';

export const permissions = shield({
  query: {
    aggregateUser: allow,
    findFirstUser: allow,
    findManyUser: allow,
    findUniqueUser: allow,
    groupByUser: allow,
  },
  mutation: {
    createOneUser: deny,
    deleteManyUser: allow,
    deleteOneUser: allow,
    updateManyUser: allow,
    updateOneUser: allow,
    upsertOneUser: allow,
  },
})
