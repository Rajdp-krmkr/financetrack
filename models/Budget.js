import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  actualSpent: { type: Number, default: 0 },
  period: { type: String, default: "monthly" },
  notes: { type: String },
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
