import z from 'zod';

export const statusEnum = z.enum(['active', 'inactive']);

export const statusSchema = z
  .object({
    status: statusEnum.default('active').optional().nullable(),
  })
  .strict();