import cors from "cors";
import express from "express";
import morgan from "morgan";
import Stripe from "stripe";
import globalErrorHandler from "./app/middleware/globalError";
import { notFound } from "./app/middleware/not-found";
import router from "./app/routes";

const app = express();

export const stripe = new Stripe(process.env.STRIPE_SK as string);
// Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.use("/api/v1", router);
// 404 Handler
app.use(notFound);

app.use(globalErrorHandler);

export default app;
