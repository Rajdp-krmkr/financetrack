"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";

//alert-dialog-box
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BudgetCard = ({ budget, statusColor, percentage }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);

  const handleDeleteClick = (budget) => {
    setBudgetToDelete(budget);
    setShowConfirmDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log(budgetToDelete);

    //add the function

    setBudgetToDelete(null);
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Card key={budget._id} className="relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full ${statusColor}`} />
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
                // onClick={() => handleEditClick(transaction)}
                className="h-8 w-8"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteClick(budget)}
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
                ${(budget.limit - budget.actualSpent).toFixed(2)} remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              // onClick={handleConfirmDelete}
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BudgetCard;
