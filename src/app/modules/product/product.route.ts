import { Router } from "express";
import { validSchema } from "../../middleware/validator";
import {
  confirmManyProductOrderController,
  createProduct,
  deleteProductByIdController,
  getAllProduct,
  getFeaturedProduct,
  getSingleProduct,
  updateProductByIdController,
} from "./product.controller";
import {
  productOrderBodySchema,
  productValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
const router = Router();
router.get("/", getAllProduct);
router.get("/featured", getFeaturedProduct);
router.get("/get/:id", getSingleProduct);
router.post(
  "/create-product",
  validSchema(productValidationSchema),
  createProduct,
);
router.put(
  "/update/:id",
  validSchema(updateProductValidationSchema),
  updateProductByIdController,
);
router.delete("/delete/:id", deleteProductByIdController);
router.post(
  "/order-many",
  validSchema(productOrderBodySchema),
  confirmManyProductOrderController,
);
export const ProductRoutes = router;
