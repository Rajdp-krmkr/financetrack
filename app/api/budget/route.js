import { dbConnect } from "@/lib/dbConnect";
import Budget from "@/models/Budget"; // Ensure you have a Budget model defined based on the schema

// Fetch all budgets
export const GET = async () => {
  try {
    await dbConnect();
    const budgets = await Budget.find(); // Get all budgets from the DB
    return new Response(JSON.stringify(budgets), { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return new Response("Error fetching budgets", { status: 500 });
  }
};

// Store or update a budget
export const POST = async (req) => {
  const { category, limit, actualSpent, period, notes } = await req.json();

  if (!category || !limit) {
    return new Response("Category and limit are required.", { status: 400 });
  }

  try {
    await dbConnect();

    // Use findOneAndUpdate with upsert option to update or create the document
    const updatedBudget = await Budget.findOneAndUpdate(
      { category }, // Check if a document with this category exists
      {
        category,
        limit,
        actualSpent,
        period,
        notes,
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if one does not exist
        runValidators: true, // Ensure validation rules are enforced
      }
    );

    return new Response(JSON.stringify(updatedBudget), { status: 200 });
  } catch (error) {
    console.error("Error saving budget:", error);
    return new Response("Error saving budget", { status: 500 });
  }
};

export const PUT = async (req) => {
  console.log(req.body);
  await dbConnect();

  try {
    const body = await req.json();

    const { category, period, limit } = body;

    if (!category || !period || !limit) {
      return new Response(
        { message: "Category, limit and period are required." },
        { status: 400 }
      );
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { category },
      { period, limit }
    );
    // await Budget.findOneAndUpdate;
    console.log(updatedBudget);
    return new Response(
      { message: "Budget updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating budget:", error);
    return new Response("Error updating budget", { status: 500 });
  }
};

export const DELETE = async (req) => {
  console.log(req.body);
  await dbConnect();

  try {
    const body = await req.json();
    // console.log(body);

    const { category, limit } = body;
    // console.log("category, limit: ", category, limit);

    if (!category || !limit) {
      return new Response(
        { message: "Category and limit are required." },
        { status: 400 }
      );
    }

    const deletedBudget = await Budget.findOne({ category });
    await Budget.deleteOne();
    console.log(deletedBudget);
    return new Response(
      { message: "Budget deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting budget:", error);
    return new Response("Error deleting budget", { status: 500 });
  }
};
