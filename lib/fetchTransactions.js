export async function fetchTransactions() {
  try {
    const response = await fetch("/api/transactions"); // Adjust API route if needed
    const data = await response.json();
    console.log("Fetched Transactions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function getMonthlyExpenses() {
  const transactionsArray = await fetchTransactions(); // Fetch inside function
  const monthlyData = Array(12).fill(0);

  if (transactionsArray.length > 0) {
    transactionsArray.forEach((t) => {
      const month = new Date(t.date).getMonth();
      monthlyData[month] += t.amount;
    });
  }

  return monthlyData;
}

export async function getCategoryExpenses() {
  const transactionsArray = await fetchTransactions();
  const categoryData = {};
  transactionsArray.forEach((t) => {
    categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
  });
  return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
}
