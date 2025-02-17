import { dbConnect } from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

// Connect to MongoDB
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
    // const body = {
    //   amount: 123,
    //   date: "2025-02-17",
    //   description: "dsd",
    //   category: "Healthcare",
    //   paymentMethod: "credit"
    // };
    console.log("Received Transaction Data:", body); // Log received data

    const newTransaction = await Transaction.create(body);
    console.log("Stored Transaction Data:", newTransaction); // Log stored data

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json(
      { message: "Error adding transaction", error },
      { status: 500 }
    );
  }
}
