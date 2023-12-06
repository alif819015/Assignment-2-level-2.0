import { z } from 'zod';

const userValidationSchema = z.object({
  userId: z.number().min(1),
  username: z
    .string()
    .min(1)
    .refine(Boolean, { message: 'Username is required' }),
  password: z.string().min(1),
  fullName: z.object({
    firstName: z
      .string()
      .min(1)
      .refine(Boolean, { message: 'First name is required' }),
    lastName: z
      .string()
      .min(1)
      .refine(Boolean, { message: 'Last name is required' }),
  }),
  age: z.number().int(),
  gender: z.enum(['male', 'female']),
  email: z.string().email({ message: 'Invalid email format' }).min(1),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
  orders: z.array(
    z.object({
      productName: z.string().min(1),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
  isDeleted: z.boolean(),
});

export default userValidationSchema;
