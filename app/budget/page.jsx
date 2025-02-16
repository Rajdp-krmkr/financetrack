"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

//data
import { getBudgets, updateBudget, getCategories } from "@/lib/data";

const Page = () => {
  const [budgets, setBudgets] = useState(getBudgets());

  const getBudgetStatusColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <Button className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const percentage = (budget.actualSpent / budget.limit) * 100;
            const statusColor = getBudgetStatusColor(
              budget.actualSpent,
              budget.limit
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
