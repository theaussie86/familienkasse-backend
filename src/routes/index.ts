import { Router, Request, Response } from "express";

// Create a new router instance
const router = Router();

// Define your route handler
router.get("/", (req: Request, res: Response) => {
  res.send("Familienkasse API is running");
});

// Export the router
export default router;
