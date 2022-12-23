import { z } from 'zod';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserCreateInputObjectSchema } from './objects/UserCreateInput.schema';

export const UserCreateOneSchema = z.object({
  select: UserSelectObjectSchema.optional(),
  data: UserCreateInputObjectSchema,
});
