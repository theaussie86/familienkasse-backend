import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import transactionRouter from "./routes/transaction";
import { authenticateJWT } from "./middleware/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(","),
  })
);
app.use(helmet());

app.use(authenticateJWT);
app.use(router);
app.use("/transaction", transactionRouter);

export default app;
