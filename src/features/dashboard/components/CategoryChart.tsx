"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { DUMMY_TRANSACTIONS } from "@/shared/data/transactions";

const COLORS = [
  "#000000",
  "#F97316",
  "#22C55E",
  "#3B82F6",
  "#A855F7",
  "#EC4899",
  "#EAB308",
];

export const CategoryChart = () => {
  const data = useMemo(() => {
    const categoryTotals: Record<string, number> = {};

    // Only count expenses for category breakdown
    DUMMY_TRANSACTIONS.filter((tx) => tx.type === "expense").forEach((tx) => {
      categoryTotals[tx.category] =
        (categoryTotals[tx.category] || 0) + tx.amount;
    });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-200">
        Category Breakdown
      </h3>
      <div className="h-64 w-full bg-white dark:bg-[#1a1b21] rounded-2xl p-4 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none transition-all duration-500">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              cornerRadius={10}
              stroke="none"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#121217",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
            />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
              wrapperStyle={{
                paddingLeft: "20px",
                fontSize: "12px",
                color: "#9CA3AF",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
