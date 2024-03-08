import z from 'zod';

export const datePlainObject = {
    createdAt: z.coerce.date().optional().nullable(),
    updatedAt: z.coerce.date().optional().nullable()
};

export const dateZodObjects = z.object(datePlainObject)

export const dateSchema = dateZodObjects.strict();

