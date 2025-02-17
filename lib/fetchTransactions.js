// Fetch all transactions from the API
export async function fetchTransactions() {
  try {
    const response = await fetch("/api/transactions"); // Make an API request to the transactions endpoint
    const data = await response.json(); // Parse the response as JSON
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log any errors that occur during the fetch
    return []; // Return an empty array in case of error
  }
}

// Calculate the total expenses for each month
export async function getMonthlyExpenses() {
  const transactionsArray = await fetchTransactions(); // Fetch all transactions data
  const monthlyData = Array(12).fill(0); // Initialize an array to hold the total expenses for each month (12 months)

  if (transactionsArray.length > 0) {
    // Loop through all the transactions and aggregate the amount per month
    transactionsArray.forEach((t) => {
      const month = new Date(t.date).getMonth(); // Extract the month from the transaction date
      monthlyData[month] += t.amount; // Add the amount to the corresponding month
    });
  }

  return monthlyData; // Return the aggregated monthly data
}

// Calculate total expenses for each category
export async function getCategoryExpenses() {
  const transactionsArray = await fetchTransactions(); // Fetch all transactions data
  const categoryData = {}; // Initialize an object to store the sum of expenses per category

  // Loop through all transactions and aggregate expenses by category
  transactionsArray.forEach((t) => {
    categoryData[t.category] = (categoryData[t.category] || 0) + t.amount; // Add the amount to the respective category
  });

  // Convert the category data into an array of {name, value} objects
  return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
}

// Fetch the budget data from the API
export const fetchBudgets = async () => {
  const res = await fetch("/api/budget"); // Make an API request to the budgets endpoint
  if (!res.ok) throw new Error("Failed to fetch budgets"); // Throw an error if the request fails
  return res.json(); // Return the parsed budget data
};
