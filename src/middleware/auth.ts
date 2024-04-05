import { Request, Response, NextFunction } from "express";
import firebase from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT)
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT");
const key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

firebase.initializeApp({
  credential: firebase.credential.cert(key as firebase.ServiceAccount),
});

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Unauthorized. Missing Authorization Header" });

  try {
    const token = authHeader.split(" ")[1];

    await firebase
      .auth()
      .verifyIdToken(token)
      .then(() => next());
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid token" });
  }
};
