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
import { DUMMY_TRANSACTIONS } from "@/shared/constants/transactions";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/shared/store/useThemeStore";

const LIGHT_COLORS = [
  "#000000",
  "#F97316",
  "#22C55E",
  "#3B82F6",
  "#A855F7",
  "#EC4899",
  "#EAB308",
];

const DARK_COLORS = [
  "#FFFFFF",
  "#FB923C", // adjusted slightly for dark mode vibrancy if needed, or keep original
  "#4ADE80",
  "#60A5FA",
  "#C084FC",
  "#F472B6",
  "#FACC15",
];

export const CategoryChart = ({ className }: { className?: string }) => {
  const { theme } = useThemeStore();
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

  const currentColors = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
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
                  fill={currentColors[index % currentColors.length]}
                  opacity={0.8}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#121217" : "#fafafa",
                border: "none",
                borderRadius: "12px",
                color: theme === "dark" ? "#fff" : "#000",
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
