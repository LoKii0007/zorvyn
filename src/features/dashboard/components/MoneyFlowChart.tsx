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
import { DUMMY_TRANSACTIONS, REFERENCE_NOW } from "@/shared/data/transactions";
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, startOfMonth, endOfMonth, eachMonthOfInterval, startOfYear, isSameMonth, subWeeks, subMonths, eachWeekOfInterval, isSameWeek } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-dark text-white text-xs px-3 py-2 rounded-xl shadow-xl flex flex-col items-center">
        <span className="font-bold text-sm">₹{payload[0].value.toLocaleString()}</span>
        <span className="text-gray-400 mt-0.5">{label}</span>
      </div>
    );
  }
  return null;
};

export const MoneyFlowChart = () => {
  const [timeFilter, setTimeFilter] = useState("weekly");

  const chartData = useMemo(() => {
    const now = REFERENCE_NOW;
    
    if (timeFilter === "weekly") {
      const start = startOfWeek(now, { weekStartsOn: 1 });
      const days = eachDayOfInterval({ start, end: endOfWeek(now, { weekStartsOn: 1 }) });
      
      return days.map(day => {
        const dayTxs = DUMMY_TRANSACTIONS.filter(tx => isSameDay(parseISO(tx.date), day));
        const income = dayTxs.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
        const expense = dayTxs.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
        return {
          name: format(day, "ee, dd"),
          saving: Math.max(0, income - expense),
          expense: expense,
        };
      });
    }

    if (timeFilter === "monthly") {
      const start = startOfMonth(now);
      const weeks = eachWeekOfInterval({ start, end: endOfMonth(now) });
      
      return weeks.map((week, idx) => {
        const weekTxs = DUMMY_TRANSACTIONS.filter(tx => isSameWeek(parseISO(tx.date), week));
        const income = weekTxs.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
        const expense = weekTxs.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
        return {
          name: `Week ${idx + 1}`,
          saving: Math.max(0, income - expense),
          expense: expense,
        };
      });
    }

    if (timeFilter === "yearly") {
      const start = startOfYear(now);
      const months = eachMonthOfInterval({ start, end: now });
      
      return months.map(month => {
        const monthTxs = DUMMY_TRANSACTIONS.filter(tx => isSameMonth(parseISO(tx.date), month));
        const income = monthTxs.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
        const expense = monthTxs.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
        return {
          name: format(month, "MMM"),
          saving: Math.max(0, income - expense),
          expense: expense,
        };
      });
    }

    return [];
  }, [timeFilter]);

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Money Flow</h3>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            <span className="text-gray-600 font-medium">Total Saving</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span className="text-gray-600 font-medium">Total Expense</span>
          </div>
        </div>

        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[100px] h-8 bg-white rounded-full border-black/10 text-xs font-medium focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
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
              tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(1)+'k' : value}`}
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
              stroke="#000000"
              strokeWidth={2.5}
              dot={{ r: 0 }}
              activeDot={{
                r: 6,
                fill: "#000000",
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
