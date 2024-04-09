import { Router, Request, Response } from "express";
import { createTransaction } from "../../controllers/transaction";

// Create a new router instance
const router = Router();

// Define your route handler
router.get("/all", (req: Request, res: Response) => {
  res.send("reading all transactions");
});
router.get("/:id", (req: Request, res: Response) => {
  res.send("reading a single transaction");
});
router.post("/", createTransaction);
router.patch("/:id", (req: Request, res: Response) => {
  res.send("updating a transaction");
});
router.delete("/:id", (req: Request, res: Response) => {
  res.send("deleting a transaction");
});

// Export the router
export default router;
