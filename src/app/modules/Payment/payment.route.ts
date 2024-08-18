import { Router } from "express";
import { createStripePaymentIntent } from "./payment.controller";
const router = Router();
router.post("/create-intent", createStripePaymentIntent);
const paymentRoute = router;
export default paymentRoute;
