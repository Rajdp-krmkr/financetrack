import React from "react";

import { getMonthlyExpenses, getCategoryExpenses } from "@/lib/data";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];

const AnalyticsPage = () => {
  const monthlyData = getMonthlyExpenses().map((value, index) => ({
    month: months[index],
    amount: value,
  }));

  const categoryData = getCategoryExpenses();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card></Card>

        <Card></Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
