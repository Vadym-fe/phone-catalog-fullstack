import { z } from "zod";

export const productSchema = z.object({
  category: z.enum(['phones', 'tablets', 'accessories']),
  itemId: z.string().min(1),
  name: z.string().min(1),
  fullPrice: z.number().int().positive(),
  price: z.number().int().positive(),
  screen: z.string().min(1),
  capacity: z.string().min(1),
  color: z.string().min(1),
  ram: z.string().min(1),
  year: z.number().int().positive(),
  image: z.string().min(1),
});

export const updateProductSchema = productSchema.partial();

export const productIdSchema = z.coerce.number().int().positive();

export const limitSchema = z.coerce
  .number()
  .pipe(z.union([z.literal(4), z.literal(8), z.literal(16)]))
  .default(8);
export const sortSchema = z.enum(['age', 'title', 'price']).default('age');
export const pageSchema = z.coerce.number().int().positive().default(1);

export type CreateProduct = z.infer<typeof productSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
