import express from "express";
import paymentRoute from "../Modules/Payment/payment.route";
import { ProductRoutes } from "../Modules/Product/product.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
