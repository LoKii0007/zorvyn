"use client";

import React, { useMemo, useState } from "react";
import {
  Paperclip,
  MonitorSmartphone,
  Plane,
  Coffee,
  ArrowRight,
  Plus,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useTransactionStore } from "@/shared/store/useTransactionStore";
import { useAccountStore } from "@/shared/store/useAccountStore";
import { TransactionFormDialog } from "@/features/transactions/components/TransactionFormDialog";
import { Transaction } from "@/shared/types/transaction";
import { Button } from "@/components/ui/button";
import { getTransactionIcon, getTransactionTypeStyles } from "../helpers/dashboardHelpers";

export const TransactionsList = () => {
  const { transactions, addTransaction } = useTransactionStore();
  const { activeAccount } = useAccountStore();
  const isAdmin = activeAccount.role === "admin";
  const [isFormOpen, setIsFormOpen] = useState(false);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 10);
  }, [transactions]);

  const handleSave = (data: any) => {
    const newTx: Transaction = {
      id: `tx-${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      amount: parseFloat(data.amount),
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currency: "INR",
      userId: "user-1",
      paymentMethod: "bank",
    };
    addTransaction(newTx);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-200 transition-colors">
          Recent Transactions
        </h3>
        {isAdmin && (
          <TransactionFormDialog
            selectedTx={null}
            onSave={handleSave}
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Plus className="w-4 h-4 text-zinc-500" />
              </Button>
            }
          />
        )}
      </div>

      <div className="flex flex-col space-y-5 flex-1 mt-2">
        {recentTransactions.map((tx) => {
          const Icon = getTransactionIcon(tx.category);
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between w-full text-left group"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2.5 rounded-lg transition-colors duration-500 ${getTransactionTypeStyles(tx.type)}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-black dark:text-zinc-300 transition-colors truncate max-w-[120px] xl:max-w-[160px]">
                    {tx.title}
                  </h4>
                  <p className="text-xs text-text-muted dark:text-zinc-500 mt-0.5">
                    {format(parseISO(tx.date), "dd MMM, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-zinc-900 dark:text-zinc-300 transition-colors">
                <Paperclip className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span
                  className={`font-bold text-sm ${tx.type === "income" ? "text-green-600 dark:text-emerald-500/80" : "text-black dark:text-zinc-300"}`}
                >
                  {tx.type === "income" ? "+" : "-"}₹
                  {tx.amount.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
        {recentTransactions.length === 0 && (
          <div className="py-8 text-center text-xs text-gray-400">
            No recent transactions.
          </div>
        )}
      </div>

      <Link
        href="/transactions"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-black/5 dark:border-white/3 rounded-xl text-sm font-semibold text-black dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/2 transition-all"
      >
        View All
        <ArrowRight className="w-4 h-4 opacity-70" />
      </Link>
    </div>
  );
};
