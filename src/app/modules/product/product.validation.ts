import { z } from "zod";

export const productValidationSchema = z.object({
  image: z.string({ message: "image is required" }),
  title: z.string({ message: "product title is required" }),
  price: z
    .number({ message: "product price is required as number" })
    .positive(),
  stock: z.number({ message: "product stock is required as number" }).min(0),
  details: z.string({ message: "product details is required" }),
  category: z.string({ message: "product category is required" }),
  tag: z.string().optional(),
});
export const updateProductValidationSchema = z.object({
  image: z.string().optional(),
  title: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().min(0).optional(),
  details: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
});

const confirmOrderValiationSchema = z.object({
  quantity: z.number().int().positive(),
  _id: z.string(),
});

export const productOrderBodySchema = z.object({
  cartItems: z.array(confirmOrderValiationSchema),
});
