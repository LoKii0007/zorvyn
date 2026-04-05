"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, MoreVertical } from "lucide-react";
import { ScaleCard } from "../../../components/ui/ScaleCard";
import {
  DUMMY_TRANSACTIONS,
  REFERENCE_NOW,
} from "@/shared/constants/transactions";
import { parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "./DateRangePicker";
import {
  isWithinTimeFilter,
  getPreviousPeriodDate,
} from "@/shared/utils/dateUtils";
import { DateRange } from "@/shared/types/date.types";
import { subDays } from "date-fns";
import { calculateTotals, calculatePercent } from "../utils/dashboardHelpers";
import { AnimatePresence, motion } from "motion/react";

export const FinancialRecord = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(REFERENCE_NOW, 30),
    to: REFERENCE_NOW,
  });

  const stats = useMemo(() => {
    const now = REFERENCE_NOW;

    const currentPeriodTransactions = DUMMY_TRANSACTIONS.filter((tx) =>
      isWithinTimeFilter(parseISO(tx.date), timeFilter, now, dateRange),
    );

    const prevDate = getPreviousPeriodDate(timeFilter, now);

    const prevPeriodTransactions = DUMMY_TRANSACTIONS.filter((tx) =>
      isWithinTimeFilter(parseISO(tx.date), timeFilter, prevDate, dateRange),
    );

    const current = calculateTotals(currentPeriodTransactions);
    const prev = calculateTotals(prevPeriodTransactions);

    return [
      {
        title: "Total Income",
        amount: `₹${current.income.toLocaleString()}`,
        percent: calculatePercent(current.income, prev.income),
        color:
          "bg-card-green dark:bg-emerald-950/20 text-text-green dark:text-emerald-500/80",
        lightChartColor: "stroke-green-300 dark:stroke-emerald-500/20",
        isPositive: current.income >= prev.income,
      },
      {
        title: "Total Expense",
        amount: `₹${current.expense.toLocaleString()}`,
        percent: calculatePercent(current.expense, prev.expense),
        color:
          "bg-card-orange dark:bg-orange-950/20 text-text-orange dark:text-orange-500/80",
        lightChartColor: "stroke-orange-300 dark:stroke-orange-500/20",
        isPositive: current.expense <= prev.expense,
      },
      {
        title: "Total Saving",
        amount: `₹${current.saving.toLocaleString()}`,
        percent: calculatePercent(current.saving, prev.saving),
        color:
          "bg-card-blue dark:bg-blue-950/30 text-text-blue dark:text-blue-300",
        lightChartColor: "stroke-blue-300 dark:stroke-blue-500/20",
        isPositive: current.saving >= prev.saving,
      },
    ];
  }, [timeFilter, dateRange]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center mb-4">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-200 transition-colors">
          Financial Record
        </h3>
        <div className="flex flex-row-reverse md:flex-row items-center justify-between md:justify-end gap-2">
          <DateRangePicker
            date={dateRange}
            setDate={(range) => {
              setDateRange(range);
              setTimeFilter("custom");
            }}
          />
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[100px] h-8 bg-white dark:bg-[#1a1b21] rounded-full border-black/10 dark:border-white/5 text-xs font-medium focus:ring-0 dark:text-zinc-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#1f2027] dark:border-white/8">
              <SelectItem
                value="daily"
                className="dark:text-zinc-400 dark:focus:bg-white/3"
              >
                Daily
              </SelectItem>
              <SelectItem
                value="weekly"
                className="dark:text-zinc-400 dark:focus:bg-white/3"
              >
                Weekly
              </SelectItem>
              <SelectItem
                value="monthly"
                className="dark:text-zinc-400 dark:focus:bg-white/3"
              >
                Monthly
              </SelectItem>
              <SelectItem
                value="yearly"
                className="dark:text-zinc-400 dark:focus:bg-white/3"
              >
                Yearly
              </SelectItem>
              <SelectItem
                value="custom"
                className="dark:text-zinc-400 dark:focus:bg-white/3"
              >
                Custom
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((record, index) => (
          <div
            key={index}
            className={`${record.color} border-0! bg-card rounded-2xl p-6 hover:scale-102 transition-all duration-200 ease-in-out border-black/5 flex flex-col justify-between h-36 relative overflow-hidden shadow-sm dark:shadow-none`}
          >
            <div className="flex justify-between items-start w-full relative z-10">
              <span className="text-sm font-medium opacity-80 dark:opacity-50">
                {record.title}
              </span>
              <button className="hover:bg-black/5 dark:hover:bg-white/3 rounded-full p-1 opacity-60">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={record.amount}
                initial={{ filter: "blur(3px)" }}
                animate={{ filter: "blur(0px)" }}
                exit={{ filter: "blur(3px)" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex justify-between items-end w-full relative z-10 "
              >
                <h4 className="text-xl sm:text-2xl font-bold text-black dark:text-zinc-200/90 ">
                  {record.amount}
                </h4>

                <div
                  className={`flex items-center space-x-1 text-xs font-semibold ${record.isPositive ? "text-green-600 dark:text-emerald-500/60" : "text-red-500 dark:text-red-500/60"}`}
                >
                  <ArrowUpRight
                    className={`w-3 h-3 ${!record.isPositive && "rotate-90"}`}
                  />
                  <span className="">{record.percent}</span>
                </div>
              </motion.div>
            </AnimatePresence>

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
          </div>
        ))}
      </div>
    </div>
  );
};
