import { Request, Response } from "express";
import { Transaction } from "../models/transaction";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const transaction = new Transaction(req.body);
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
    console.error(error);
  }
};
