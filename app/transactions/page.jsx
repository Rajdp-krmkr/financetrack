"use client";

import React, { useState } from "react";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/lib/data";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState(getTransactions());
  return <div>Page</div>;
};

export default Page;
