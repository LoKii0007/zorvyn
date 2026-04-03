import { Coffee, Plane, MonitorSmartphone } from "lucide-react";
import { Transaction } from "@/shared/types/transaction";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  isSameWeek,
  startOfYear,
  eachMonthOfInterval,
  isSameMonth,
  differenceInDays,
} from "date-fns";
import { DateRange } from "@/shared/utils/dateUtils";

/**
 * Groups transactions for the MoneyFlowChart based on absolute interval and explicit grouping.
 */
export const getMoneyFlowData = (
  transactions: Transaction[],
  interval: { from: Date; to: Date },
  grouping: "daily" | "weekly" | "monthly" | "yearly",
) => {
  const { from: start, to: end } = interval;

  if (grouping === "daily") {
    const days = eachDayOfInterval({ start, end });
    return days.map((day) => {
      const dayTxs = transactions.filter((tx) =>
        isSameDay(parseISO(tx.date), day),
      );
      const { saving, expense } = calculateTotals(dayTxs);
      return {
        name: format(day, "MMM dd"),
        saving,
        expense,
      };
    });
  }

  if (grouping === "weekly") {
    try {
      const weeks = eachWeekOfInterval({ start, end });
      return weeks.map((week, idx) => {
        const weekTxs = transactions.filter((tx) =>
          isSameWeek(parseISO(tx.date), week),
        );
        const { saving, expense } = calculateTotals(weekTxs);
        return {
          name: `Week ${idx + 1}`,
          saving,
          expense,
        };
      });
    } catch { return []; }
  }

  if (grouping === "monthly") {
    try {
      const months = eachMonthOfInterval({ start, end });
      return months.map((month) => {
        const monthTxs = transactions.filter((tx) =>
          isSameMonth(parseISO(tx.date), month),
        );
        const { saving, expense } = calculateTotals(monthTxs);
        return {
          name: format(month, "MMM yy"),
          saving,
          expense,
        };
      });
    } catch { return []; }
  }

  if (grouping === "yearly") {
    try {
      let current = startOfYear(start);
      const endYear = startOfYear(end);
      const yearList = [];
      while (current <= endYear) {
        yearList.push(current);
        current = new Date(current.getFullYear() + 1, 0, 1);
      }
      
      return yearList.map((year) => {
        const yearTxs = transactions.filter((tx) =>
          format(parseISO(tx.date), "yyyy") === format(year, "yyyy"),
        );
        const { saving, expense } = calculateTotals(yearTxs);
        return {
          name: format(year, "yyyy"),
          saving,
          expense,
        };
      });
    } catch { return []; }
  }

  return [];
};

/**
 * Calculates current income, expense, and saving totals.
 */
export const calculateTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  return { income, expense, saving: Math.max(0, income - expense) };
};

/**
 * Calculates percentage difference between current and previous periods.
 */
export const calculatePercent = (curr: number, prev: number) => {
  if (prev === 0) return curr > 0 ? "100%" : "0%";
  const diff = ((curr - prev) / prev) * 100;
  return `${Math.abs(Math.round(diff))}%`;
};

/**
 * Maps a transaction category to its corresponding UI icon.
 */
export const getTransactionIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case "food":
      return Coffee;
    case "transport":
      return Plane;
    case "entertainment":
      return MonitorSmartphone;
    default:
      return MonitorSmartphone;
  }
};

/**
 * Returns consistent Tailwind classes for transaction types.
 */
export const getTransactionTypeStyles = (type: string) => {
  return type === "income"
    ? "text-green-600 dark:text-emerald-500/70 bg-green-50 dark:bg-emerald-950/20"
    : "text-orange-500 dark:text-orange-500/70 bg-orange-50 dark:bg-orange-950/20";
};
