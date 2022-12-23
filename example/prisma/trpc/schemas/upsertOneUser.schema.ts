import { z } from 'zod';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserCreateInputObjectSchema } from './objects/UserCreateInput.schema';
import { UserUpdateInputObjectSchema } from './objects/UserUpdateInput.schema';

export const UserUpsertSchema = z.object({
  select: UserSelectObjectSchema.optional(),
  where: UserWhereUniqueInputObjectSchema,
  create: UserCreateInputObjectSchema,
  update: UserUpdateInputObjectSchema,
});
