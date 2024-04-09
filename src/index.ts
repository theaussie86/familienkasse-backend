import app from "./app";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}

connectDB();

const PORT = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
