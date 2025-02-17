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

// Edit transaction - subtract old amount and add new amount
export async function PUT(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id, category, amount, previousAmount } = body;

    // Find the transaction to update
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    // Subtract the previous amount from the actualSpent in the Budget
    const budget = await Budget.findOne({ category });
    if (budget) {
      // Update the budget by subtracting the old amount and adding the new amount
      await Budget.updateOne(
        { category },
        {
          $inc: {
            actualSpent: amount - previousAmount, // Increment by the difference
          },
        }
      );
    }

    // Update the transaction data
    transaction.date = body.date;
    transaction.description = body.description;
    transaction.category = body.category;
    transaction.paymentMethod = body.paymentMethod;
    transaction.amount = body.amount;

    await transaction.save();

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { message: "Error updating transaction", error },
      { status: 500 }
    );
  }
}

// Delete transaction - subtract amount from the budget's actualSpent
export async function DELETE(req) {
  await dbConnect();

  try {
    const { _id, category, amount } = await req.json();

    // Find the transaction to delete
    const transaction = await Transaction.findById(_id);
    console.log("Deleting transaction:", transaction);
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    // Remove the transaction
    await Transaction.deleteOne({ _id });

    // Update the actualSpent field in the budget by subtracting the transaction amount
    const budget = await Budget.findOne({ category });
    if (budget) {
      await Budget.updateOne(
        { category },
        { $inc: { actualSpent: -amount } } // Decrement by the transaction amount
      );
    }

    // Return a response confirming the deletion
    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { message: "Error deleting transaction", error },
      { status: 500 }
    );
  }
}

  //   // Update the actualSpent field in the budget by subtracting the transaction amount
  //   const budget = await Budget.findOne({ category });
  //   if (budget) {
  //     await Budget.updateOne(
  //       { category },
  //       { $inc: { actualSpent: -amount } } // Decrement by the transaction amount
  //     );
  //   }

  //   return NextResponse.json(
  //     { message: "Transaction deleted" },
  //     { status: 200 }
  //   );
  // }
