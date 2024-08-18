"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOrderBodySchema = exports.updateProductValidationSchema = exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = zod_1.z.object({
    image: zod_1.z.string({ message: "image is required" }),
    title: zod_1.z.string({ message: "product title is required" }),
    price: zod_1.z
        .number({ message: "product price is required as number" })
        .positive(),
    stock: zod_1.z.number({ message: "product stock is required as number" }).min(0),
    details: zod_1.z.string({ message: "product details is required" }),
    category: zod_1.z.string({ message: "product category is required" }),
    tag: zod_1.z.string().optional(),
});
exports.updateProductValidationSchema = zod_1.z.object({
    image: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    price: zod_1.z.number().positive().optional(),
    stock: zod_1.z.number().min(0).optional(),
    details: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    tag: zod_1.z.string().optional(),
});
const confirmOrderValiationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
    _id: zod_1.z.string(),
});
exports.productOrderBodySchema = zod_1.z.object({
    cartItems: zod_1.z.array(confirmOrderValiationSchema),
});
