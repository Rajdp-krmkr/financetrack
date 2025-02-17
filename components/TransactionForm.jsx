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
import { getCategories, getPaymentMethod } from "@/lib/data";

export default function TransactionForm({ onSubmit, onCancel }) {
  // State to manage transaction form data
  const [transaction, setTransaction] = useState({
    amount: "", // Amount for the transaction
    date: new Date().toISOString().split("T")[0], // Default to today's date
    description: "", // Description of the transaction
    category: "", // Category of the transaction (e.g., groceries, utilities)
    paymentMethod: "", // Payment method used for the transaction
  });

  // Get categories and payment methods from the data
  const categories = getCategories();
  const payment_method = getPaymentMethod();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled before submitting
    if (
      transaction.amount &&
      transaction.date &&
      transaction.description &&
      transaction.category
    ) {
      // Pass the transaction data to the onSubmit callback with parsed amount
      onSubmit({
        ...transaction,
        amount: parseFloat(transaction.amount),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input for the transaction amount */}
        <div className="space-y-2">
          <label htmlFor="amount">Amount ($)</label>
          <Input
            id="amount"
            type="number"
            step="0.01" // Allow decimal values for the amount
            required
            value={transaction.amount}
            onChange={(e) =>
              // Update the amount value in state when input changes
              setTransaction({ ...transaction, amount: e.target.value })
            }
          />
        </div>

        {/* Input for the transaction date */}
        <div className="space-y-2">
          <label htmlFor="date">Date</label>
          <Input
            id="date"
            type="date"
            required
            value={transaction.date}
            onChange={(e) =>
              // Update the date value in state when input changes
              setTransaction({ ...transaction, date: e.target.value })
            }
          />
        </div>
      </div>

      {/* Input for the transaction description */}
      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          required
          value={transaction.description}
          onChange={(e) =>
            // Update the description value in state when input changes
            setTransaction({ ...transaction, description: e.target.value })
          }
        />
      </div>

      {/* Dropdown for selecting payment method */}
      <div className="space-y-2">
        <label>Payment Method</label>
        <Select
          required
          value={transaction.paymentMethod}
          onValueChange={(value) =>
            // Update the payment method in state when selection changes
            setTransaction({ ...transaction, paymentMethod: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            {/* Map over payment methods and create a select item for each */}
            {payment_method.map((category) => (
              <SelectItem key={category} value={category.value}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dropdown for selecting transaction category */}
      <div className="space-y-2">
        <label>Category</label>
        <Select
          required
          value={transaction.category}
          onValueChange={(value) =>
            // Update the category in state when selection changes
            setTransaction({ ...transaction, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {/* Map over categories and create a select item for each */}
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action buttons to save or cancel the transaction */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Transaction</Button>
      </div>
    </form>
  );
}
