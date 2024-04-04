import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
