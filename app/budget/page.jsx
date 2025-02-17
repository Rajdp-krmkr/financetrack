"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BudgetForm from "@/components/BudgetForm";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/data";
import { fetchBudgets } from "@/lib/fetchTransactions";

// Data functions

const createBudget = async (budgetData) => {
  const res = await fetch("/api/budget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(budgetData),
  });
  if (!res.ok) throw new Error("Failed to create budget");
  return res.json();
};

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const categories = getCategories();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch budgets on component mount
    fetchBudgets()
      .then((data) => {
        setBudgets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
        setLoading(false);
      });

    // Fetch categories (you can replace this with actual category fetching logic)
    // setCategories(["Food", "Entertainment", "Bills"]);
  }, []);

  // const handleUpdateBudget = async (budgetData) => {
  //   try {
  //     const newBudget = await createBudget(budgetData);
  //     setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  //     setShowForm(false);
  //   } catch (error) {
  //     console.error("Error creating budget:", error);
  //   }
  // };

  const handleUpdateBudget = async (budgetData) => {
    const response = await fetch("/api/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budgetData),
    });

    if (response.ok) {
      const updatedBudget = await response.json();
      setBudgets((prevBudgets) => {
        // Check if the category already exists in the state, update it if found
        const updatedBudgets = prevBudgets.map((budget) =>
          budget.category === updatedBudget.category ? updatedBudget : budget
        );

        // If not found, add the new budget to the list
        if (
          !updatedBudgets.some(
            (budget) => budget.category === updatedBudget.category
          )
        ) {
          updatedBudgets.push(updatedBudget);
        }

        return updatedBudgets;
      });
      setShowForm(false);
    } else {
      // Handle error
      console.error("Error updating budget:", response);
    }
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
        <Button onClick={() => setShowForm(true)} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </div>

      <div className="grid gap-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetForm
                categories={categories}
                onSubmit={handleUpdateBudget}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p>Loading budgets...</p>
          ) : (
            budgets.map((budget) => {
              const percentage = (budget.actualSpent / budget.limit) * 100;
              const statusColor = getBudgetStatusColor(
                budget.actualSpent,
                budget.limit
              );

              return (
                <Card key={budget._id} className="relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 w-1 h-full ${statusColor}`}
                  />
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <div>
                        <span className="mr-2">{budget.category}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          ({budget.period})
                        </span>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(transaction)}
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(transaction)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
