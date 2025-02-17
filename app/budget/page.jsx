"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BudgetForm from "@/components/BudgetForm";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/data";
import { fetchBudgets } from "@/lib/fetchTransactions";
import BudgetCard from "@/components/BudgetCard";

// Function to create a new budget
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
  const [budgets, setBudgets] = useState([]); // State to store budget data
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const categories = getCategories(); // Fetch predefined categories
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch budgets when the component mounts
  useEffect(() => {
    fetchBudgets()
      .then((data) => {
        setBudgets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
        setLoading(false);
      });
  }, []);

  // Function to handle budget creation or update
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
      console.error("Error updating budget:", response);
    }
  };

  // Function to determine budget status color based on spending percentage
  const getBudgetStatusColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "bg-red-500"; // Over budget
    if (percentage >= 75) return "bg-yellow-500"; // Nearing budget limit
    return "bg-green-500"; // Within budget
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
                <div key={budget._id}>
                  <BudgetCard
                    budget={budget}
                    statusColor={statusColor}
                    percentage={percentage}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
