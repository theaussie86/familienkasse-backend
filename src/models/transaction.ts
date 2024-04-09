import mongoose, { InferSchemaType } from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  created: { type: Date, required: true },
  description: { type: String, required: true },
  account: {
    type: String,
    required: true,
    enum: ["Spenden", "Investieren", "Sparen"],
  },
  isPaid: { type: Boolean, default: false },
});

type TransactionType = InferSchemaType<typeof transactionSchema>;

export const Transaction = mongoose.model("Transaction", transactionSchema);
