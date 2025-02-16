"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/lib/data";

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState(getTransactions());

  const handleAddTransaction = (transaction) => {
    const newTransaction = addTransaction(transaction);
    setTransactions([newTransaction, ...transactions]);
    setShowForm(false);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    updateTransaction(updatedTransaction);
    setTransactions(getTransactions());
  };

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm
              onSubmit={handleAddTransaction}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}

      <TransactionList
        transactions={transactions}
        onDelete={handleDeleteTransaction}
        onUpdate={handleUpdateTransaction}
      />
    </div>
  );
}
