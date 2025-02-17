// Temporary data store until MongoDB is integrated
// let transactions = [
//   {
//     id: '1',
//     amount: 50.00,
//     date: '2024-03-20',
//     description: 'Grocery shopping',
//     category: 'Food',
//     paymentMethod: 'credit',
//   },
//   {
//     id: '2',
//     amount: 800.00,
//     date: '2024-03-19',
//     description: 'Monthly rent',
//     category: 'Housing',
//     paymentMethod: 'transfer',
//   },
//   {
//     id: '3',
//     amount: 45.00,
//     date: '2024-03-18',
//     description: 'Gas station',
//     category: 'Transportation',
//     paymentMethod: 'debit',
//   },
// ];

// let budgets = [
//   { category: 'Food', limit: 500, actualSpent: 350, period: 'monthly', notes: 'Includes groceries and dining out' },
//   { category: 'Housing', limit: 1200, actualSpent: 800, period: 'monthly', notes: 'Rent and utilities' },
//   { category: 'Transportation', limit: 200, actualSpent: 150, period: 'monthly', notes: 'Gas and public transit' },
//   { category: 'Entertainment', limit: 300, actualSpent: 200, period: 'monthly', notes: 'Movies and activities' },
//   { category: 'Utilities', limit: 400, actualSpent: 380, period: 'monthly', notes: 'Electricity and water' },
// ];

const categories = [
  "Food",
  "Housing",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Healthcare",
  "Education",
  "Other",
];

const payment_method = [
  { title: "Cash", value: "cash" },
  { title: "Credit Card", value: "credit" },
  { title: "Debit Card", value: "debit" },
  { title: "Bank Transfer", value: "transfer" },
  // <SelectItem value="cash">Cash</SelectItem>
  // <SelectItem value="credit">Credit Card</SelectItem>
  // <SelectItem value="debit">Debit Card</SelectItem>
  // <SelectItem value="transfer">Bank Transfer</SelectItem>
];

export function getTransactions() {
  return transactions;
}

export function addTransaction(transaction) {
  const newTransaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  transactions = [newTransaction, ...transactions];
  updateBudgetSpending(newTransaction.category, newTransaction.amount);
  return newTransaction;
}

export function updateTransaction(updatedTransaction) {
  const oldTransaction = transactions.find(
    (t) => t.id === updatedTransaction.id
  );
  if (oldTransaction) {
    // Reverse the old transaction's effect on budget
    updateBudgetSpending(oldTransaction.category, -oldTransaction.amount);
    // Apply the new transaction's effect
    updateBudgetSpending(
      updatedTransaction.category,
      updatedTransaction.amount
    );
  }
  transactions = transactions.map((t) =>
    t.id === updatedTransaction.id ? updatedTransaction : t
  );
}

export function deleteTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (transaction) {
    updateBudgetSpending(transaction.category, -transaction.amount);
  }
  transactions = transactions.filter((t) => t.id !== id);
}

export function getBudgets() {
  return budgets;
}

export function updateBudget(category, limit, period = "monthly", notes = "") {
  const index = budgets.findIndex((b) => b.category === category);
  if (index !== -1) {
    budgets[index] = {
      ...budgets[index],
      limit,
      period,
      notes,
    };
  } else {
    budgets.push({
      category,
      limit,
      period,
      notes,
      actualSpent: 0,
    });
  }
}

function updateBudgetSpending(category, amount) {
  const budget = budgets.find((b) => b.category === category);
  if (budget) {
    budget.actualSpent = Math.max(0, budget.actualSpent + amount);
  }
}

export function getCategories() {
  return categories;
}
export function getPaymentMethod() {
  return payment_method;
}

export function getMonthlyExpenses() {
  const monthlyData = Array(12).fill(0);
  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();
    monthlyData[month] += t.amount;
  });
  return monthlyData;
}

export function getCategoryExpenses() {
  const categoryData = {};
  transactions.forEach((t) => {
    categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
  });
  return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
}
