"use client";

import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DUMMY_TRANSACTIONS, REFERENCE_NOW } from "@/shared/constants/transactions";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { getMoneyFlowData } from "../utils/dashboardHelpers";
import { subDays } from "date-fns";
import { MoneyFlowChartFilterDialog } from "./MoneyFlowChartFilterDialog";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-dark text-white text-xs px-3 py-2 rounded-xl shadow-xl flex flex-col items-center">
        <span className="font-bold text-sm">
          ₹{payload[0].value.toLocaleString()}
        </span>
        <span className="text-gray-400 mt-0.5">{label}</span>
      </div>
    );
  }
  return null;
};

export const MoneyFlowChart = ({ className }: { className?: string }) => {
  const [appliedGrouping, setAppliedGrouping] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("weekly");
  const [appliedInterval, setAppliedInterval] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subDays(REFERENCE_NOW, 14),
    to: REFERENCE_NOW,
  });
  const { theme } = useThemeStore();

  const chartData = useMemo(() => {
    return getMoneyFlowData(
      DUMMY_TRANSACTIONS,
      appliedInterval,
      appliedGrouping,
    );
  }, [appliedInterval, appliedGrouping]);

  return (
    <div className={cn("flex flex-col space-y-4 my-8", className)}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Money Flow</h3>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-[#fafafa]"></span>
            <span className="text-gray-600 font-medium dark:text-zinc-200">
              Total Saving
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span className="text-gray-600 font-medium dark:text-zinc-200">
              Total Expense
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MoneyFlowChartFilterDialog
            appliedInterval={appliedInterval}
            appliedGrouping={appliedGrouping}
            onApply={(interval, grouping) => {
              setAppliedInterval(interval);
              setAppliedGrouping(grouping);
            }}
            onReset={() => {
              setAppliedInterval({
                from: subDays(REFERENCE_NOW, 14),
                to: REFERENCE_NOW,
              });
              setAppliedGrouping("weekly");
            }}
          />
        </div>
      </div>

      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(value) =>
                `₹${value >= 1000 ? (value / 1000).toFixed(1) + "k" : value}`
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#E5E7EB",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
            />
            <Line
              type="monotone"
              dataKey="saving"
              stroke={theme === "dark" ? "#fafafa" : "#000000"}
              strokeWidth={2.5}
              dot={{ r: 0 }}
              activeDot={{
                r: 6,
                fill: theme === "dark" ? "#fafafa" : "#000000",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#F97316"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
