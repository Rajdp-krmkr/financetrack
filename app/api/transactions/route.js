import { dbConnect } from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

// Connect to MongoDB and handle GET and POST requests
export async function GET() {
  await dbConnect();
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching transactions", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    console.log("Received Transaction Data:", body); // Log received data

    // Create a new transaction
    const newTransaction = await Transaction.create(body);
    console.log("Stored Transaction Data:", newTransaction); // Log stored data

    // Update the 'actualSpent' value in the budget if the category exists
    const { category, amount } = body; // Extract category and amount from the body
    const budget = await Budget.findOne({ category });

    if (budget) {
      // Update the actualSpent field of the respective category by incrementing it
      await Budget.updateOne({ category }, { $inc: { actualSpent: amount } });
      console.log(`Updated budget for category: ${category}`);
    } else {
      console.log(`No budget found for category: ${category}`);
    }

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json(
      { message: "Error adding transaction", error },
      { status: 500 }
    );
  }
}
