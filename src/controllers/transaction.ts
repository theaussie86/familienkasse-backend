import { Request, Response } from "express";
import { Transaction } from "../models/transaction";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    transaction.set(req.body);
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteTransactionById = async (req: Request, res: Response) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
