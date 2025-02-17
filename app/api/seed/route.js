import { dbConnect } from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import Budget from "@/models/Budget";

export async function POST(req) {
  await dbConnect();

  try {
    // Insert transactions
    await Transaction.insertMany([
      {
        amount: 50.0,
        date: "2024-03-20",
        description: "Grocery shopping",
        category: "Food",
        paymentMethod: "credit",
      },
      {
        amount: 800.0,
        date: "2024-03-19",
        description: "Monthly rent",
        category: "Housing",
        paymentMethod: "transfer",
      },
      {
        amount: 45.0,
        date: "2024-03-18",
        description: "Gas station",
        category: "Transportation",
        paymentMethod: "debit",
      },
    ]);

    // Insert budgets
    await Budget.insertMany([
      {
        category: "Food",
        limit: 500,
        actualSpent: 350,
        period: "monthly",
        notes: "Groceries and dining out",
      },
      {
        category: "Housing",
        limit: 1200,
        actualSpent: 800,
        period: "monthly",
        notes: "Rent and utilities",
      },
      {
        category: "Transportation",
        limit: 200,
        actualSpent: 150,
        period: "monthly",
        notes: "Gas and public transit",
      },
    ]);

    return Response.json(
      { message: "Database seeded successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error seeding database", error },
      { status: 500 }
    );
  }
}
