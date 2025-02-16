"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

//data
import { getBudgets, updateBudget, getCategories } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Page = () => {
  const [budgets, setBudgets] = useState(getBudgets());
  const [showForm, setShowForm] = useState(false);
  const categories = getCategories();

  const handleUpdateBudget = (budgetData) => {
    updateBudget(budgetData.category, budgetData.limit);
    setBudgets(getBudgets());
    setShowForm(false);
  };

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

            return (
              <Card key={budget.category} className="relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${statusColor}`}
                />
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{budget.category}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Monthly
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>${budget.actualSpent.toFixed(2)}</span>
                    <span className="text-muted-foreground">
                      ${budget.limit.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Progress
                      value={percentage}
                      className={percentage > 100 ? "bg-red-200" : ""}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{percentage.toFixed(1)}% spent</span>
                      <span>
                        ${(budget.limit - budget.actualSpent).toFixed(2)}{" "}
                        remaining
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
