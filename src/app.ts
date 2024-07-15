import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to NextGen-Fitness");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
