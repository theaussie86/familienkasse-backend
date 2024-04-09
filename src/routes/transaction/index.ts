import { Router, Request, Response } from "express";
import {
  createTransaction,
  deleteTransactionById,
  getTransactionById,
  getTransactions,
  updateTransactionById,
} from "../../controllers/transaction";

// Create a new router instance
const router = Router();

// Define your route handler
router.get("/all", getTransactions);
router.get("/:id", getTransactionById);
router.post("/", createTransaction);
router.patch("/:id", updateTransactionById);
router.delete("/:id", deleteTransactionById);

// Export the router
export default router;
