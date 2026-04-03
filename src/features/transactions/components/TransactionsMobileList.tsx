"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Transaction } from "@/shared/types/transaction";

interface TransactionsMobileListProps {
  transactions: Transaction[];
  isAdmin: boolean;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
}

export const TransactionsMobileList = ({
  transactions,
  isAdmin,
  onEdit,
  onDelete,
}: TransactionsMobileListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-zinc-400 dark:text-zinc-600 bg-white dark:bg-[#1a1b21] rounded-2xl border border-gray-100 dark:border-white/3">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="bg-white dark:bg-[#1a1b21] rounded-2xl border border-gray-100 dark:border-white/3 p-4 shadow-sm dark:shadow-none flex flex-col gap-3 transition-colors duration-300"
        >
          {/* Row 1: Title + Amount */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[15px] text-zinc-900 dark:text-zinc-200 leading-tight truncate">
                {tx.title}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {tx.category}
                </span>
                <span className="text-[11px] text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {tx.subCategory}
                </span>
              </div>
            </div>
            <span
              className={`font-bold text-[15px] shrink-0 ${
                tx.type === "income"
                  ? "text-green-600 dark:text-emerald-500/80"
                  : "text-red-500 dark:text-red-500/70"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}₹
              {tx.amount.toLocaleString()}
            </span>
          </div>

          {/* Row 2: Date + Status + Actions */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {format(parseISO(tx.date), "dd MMM yyyy")}
            </span>

            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`px-2.5 py-1 font-medium text-[12px] rounded-full border-transparent shadow-none capitalize ${
                  tx.status === "pending"
                    ? "bg-[#FFF4D6] dark:bg-orange-950/20 text-[#D49100] dark:text-orange-500/70"
                    : tx.status === "completed"
                    ? "bg-[#DCFCE7] dark:bg-emerald-950/20 text-[#16A34A] dark:text-emerald-500/70"
                    : "bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                }`}
              >
                {tx.status}
              </Badge>

              {isAdmin && (
                <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-600">
                  <button
                    onClick={() => onEdit(tx)}
                    className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-zinc-300 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(tx)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
