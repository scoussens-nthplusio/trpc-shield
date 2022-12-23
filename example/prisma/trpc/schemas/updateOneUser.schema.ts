import { z } from 'zod';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserUpdateInputObjectSchema } from './objects/UserUpdateInput.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserUpdateOneSchema = z.object({
  select: UserSelectObjectSchema.optional(),
  data: UserUpdateInputObjectSchema,
  where: UserWhereUniqueInputObjectSchema,
});
