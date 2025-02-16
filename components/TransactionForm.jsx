"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/lib/data";

export default function TransactionForm({ onSubmit, onCancel }) {
  const [transaction, setTransaction] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "",
  });

  const categories = getCategories();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      transaction.amount &&
      transaction.date &&
      transaction.description &&
      transaction.category
    ) {
      onSubmit({
        ...transaction,
        amount: parseFloat(transaction.amount),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="amount">Amount ($)</label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            required
            value={transaction.amount}
            onChange={(e) =>
              setTransaction({ ...transaction, amount: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date">Date</label>
          <Input
            id="date"
            type="date"
            required
            value={transaction.date}
            onChange={(e) =>
              setTransaction({ ...transaction, date: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          required
          value={transaction.description}
          onChange={(e) =>
            setTransaction({ ...transaction, description: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label>Category</label>
        <Select
          required
          value={transaction.category}
          onValueChange={(value) =>
            setTransaction({ ...transaction, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Transaction</Button>
      </div>
    </form>
  );
}
