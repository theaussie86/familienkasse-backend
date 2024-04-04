import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import { authenticateJWT } from "./middleware/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(authenticateJWT);
app.use(router);

export default app;
