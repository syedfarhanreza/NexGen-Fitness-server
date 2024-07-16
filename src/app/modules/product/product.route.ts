import express from "express";
import { productControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-product",
  validateRequest(ProductValidations.createProductValidationSchema),
  productControllers.createProducts
);

router.get("/:id", productControllers.getSingleProduct);

router.put(
  "/:id",
  validateRequest(ProductValidations.updateProductValidationSchema),
  productControllers.updateProduct
);

router.delete("/:id", productControllers.deleteProduct);

router.get("/", productControllers.getAllProducts);

export const ProductRoutes = router;
