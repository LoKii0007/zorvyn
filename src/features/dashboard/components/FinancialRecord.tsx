"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, MoreVertical } from "lucide-react";
import { ScaleCard } from "../../../components/ui/ScaleCard";
import { DUMMY_TRANSACTIONS, REFERENCE_NOW } from "@/shared/data/transactions";
import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  parseISO,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FinancialRecord = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");

  const stats = useMemo(() => {
    const now = REFERENCE_NOW;

    const filterByTime = (
      txDate: Date,
      filter: string,
      referenceDate: Date,
    ) => {
      switch (filter) {
        case "daily":
          return isSameDay(txDate, referenceDate);
        case "weekly":
          return isSameWeek(txDate, referenceDate, { weekStartsOn: 1 });
        case "monthly":
          return isSameMonth(txDate, referenceDate);
        case "yearly":
          return isSameYear(txDate, referenceDate);
        default:
          return true;
      }
    };

    const currentPeriodTransactions = DUMMY_TRANSACTIONS.filter((tx) =>
      filterByTime(parseISO(tx.date), timeFilter, now),
    );

    const prevDate = (() => {
      switch (timeFilter) {
        case "daily":
          return subDays(now, 1);
        case "weekly":
          return subWeeks(now, 1);
        case "monthly":
          return subMonths(now, 1);
        case "yearly":
          return subYears(now, 1);
        default:
          return subMonths(now, 1);
      }
    })();

    const prevPeriodTransactions = DUMMY_TRANSACTIONS.filter((tx) =>
      filterByTime(parseISO(tx.date), timeFilter, prevDate),
    );

    const calculateTotals = (transactions: typeof DUMMY_TRANSACTIONS) => {
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);
      const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);
      return { income, expense, saving: Math.max(0, income - expense) };
    };

    const current = calculateTotals(currentPeriodTransactions);
    const prev = calculateTotals(prevPeriodTransactions);

    const calculatePercent = (curr: number, prev: number) => {
      if (prev === 0) return curr > 0 ? "100%" : "0%";
      const diff = ((curr - prev) / prev) * 100;
      return `${Math.abs(Math.round(diff))}%`;
    };

    return [
      {
        title: "Total Income",
        amount: `₹${current.income.toLocaleString()}`,
        percent: calculatePercent(current.income, prev.income),
        color: "bg-card-green dark:bg-emerald-950/20 text-text-green dark:text-emerald-500/80",
        lightChartColor: "stroke-green-300 dark:stroke-emerald-500/20",
        isPositive: current.income >= prev.income,
      },
      {
        title: "Total Expense",
        amount: `₹${current.expense.toLocaleString()}`,
        percent: calculatePercent(current.expense, prev.expense),
        color: "bg-card-orange dark:bg-orange-950/20 text-text-orange dark:text-orange-500/80",
        lightChartColor: "stroke-orange-300 dark:stroke-orange-500/20",
        isPositive: current.expense <= prev.expense,
      },
      {
        title: "Total Saving",
        amount: `₹${current.saving.toLocaleString()}`,
        percent: calculatePercent(current.saving, prev.saving),
        color: "bg-card-blue dark:bg-blue-950/20 text-text-blue dark:text-blue-500/80",
        lightChartColor: "stroke-blue-300 dark:stroke-blue-500/20",
        isPositive: current.saving >= prev.saving,
      },
    ];
  }, [timeFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-200 transition-colors">Financial Record</h3>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[100px] h-8 bg-white dark:bg-[#1a1b21] rounded-full border-black/10 dark:border-white/[0.05] text-xs font-medium focus:ring-0 dark:text-zinc-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="dark:bg-[#1f2027] dark:border-white/[0.08]">
            <SelectItem value="daily" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Daily</SelectItem>
            <SelectItem value="weekly" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Weekly</SelectItem>
            <SelectItem value="monthly" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Monthly</SelectItem>
            <SelectItem value="yearly" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((record, index) => (
          <ScaleCard
            key={index}
            className={`${record.color} border-0! flex flex-col justify-between h-36 relative overflow-hidden transition-colors duration-500 shadow-sm dark:shadow-none`}
          >
            <div className="flex justify-between items-start w-full relative z-10">
              <span className="text-sm font-medium opacity-80 dark:opacity-50">
                {record.title}
              </span>
              <button className="hover:bg-black/5 dark:hover:bg-white/[0.03] rounded-full p-1 opacity-60">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-between items-end w-full relative z-10">
              <h4 className="text-2xl font-bold text-black dark:text-zinc-200 transition-colors">{record.amount}</h4>
              <div
                className={`flex items-center space-x-1 text-xs font-semibold ${record.isPositive ? "text-green-600 dark:text-emerald-500/60" : "text-red-500 dark:text-red-500/60"}`}
              >
                <ArrowUpRight
                  className={`w-3 h-3 ${!record.isPositive && "rotate-90"}`}
                />
                <span>{record.percent}</span>
              </div>
            </div>

            <svg
              className="absolute inset-0 pt-10 pb-6 px-4 w-full h-full opacity-30 dark:opacity-10 pointer-events-none"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 Q20,20 40,35 T80,10 T120,30 T160,5"
                fill="none"
                className={record.lightChartColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </ScaleCard>
        ))}
      </div>
    </div>
  );
};
