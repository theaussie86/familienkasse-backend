import { Request, Response, NextFunction } from "express";
import admin from "../util/firebase";

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

    await admin
      .auth()
      .verifyIdToken(token)
      .then(() => next());
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid token" });
  }
};
