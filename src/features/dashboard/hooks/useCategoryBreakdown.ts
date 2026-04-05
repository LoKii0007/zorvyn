import { useMemo } from "react";
import { DUMMY_TRANSACTIONS } from "@/shared/constants/transactions";

export const useCategoryBreakdown = () => {
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

  return data;
};
