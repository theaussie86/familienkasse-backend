import admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT)
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT");
const key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(key as admin.ServiceAccount),
});

export default admin;
