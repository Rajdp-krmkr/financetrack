import React from "react";

import { getTransactions, getBudgets } from "@/lib/data";

const page = () => {
  const transactions = getTransactions();
  const budgets = getBudgets();

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const overBudgetCategories = budgets.filter((b) => b.actualSpent > b.limit);

  // console.log(totalExpenses, totalBudget, overBudgetCategories);

  return <div>page</div>;
};

export default page;
