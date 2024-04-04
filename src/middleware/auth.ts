import { Request, Response, NextFunction } from "express";
import firebase from "firebase-admin";
import key from "../../service-account-key.json";

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
