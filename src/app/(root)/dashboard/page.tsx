"use client";

import React, { useState } from "react";
import { FinancialRecord } from "@/features/dashboard/components/FinancialRecord";
import { MoneyFlowChart } from "@/features/dashboard/components/MoneyFlowChart";
import { CategoryChart } from "@/features/dashboard/components/CategoryChart";
import { TransactionsList } from "@/features/dashboard/components/TransactionsList";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

export default function DashboardPage() {
  const [showTransactions, setShowTransactions] = useState(true);

  return (
    <div className="w-full flex-1 flex flex-col xl:flex-row overflow-y-auto xl:h-full xl:overflow-hidden relative bg-[#f7f8fa] dark:bg-[#14151a]">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowTransactions(!showTransactions)}
        className={`hidden xl:flex absolute top-6 z-30 w-7 h-7 p-0 rounded-full bg-white dark:bg-[#1a1b21] border border-black/5 dark:border-white/10 shadow-md text-zinc-400 hover:text-black dark:hover:text-zinc-200 items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer ${
          showTransactions
            ? "right-[30%] -mr-3.5 hover:translate-x-2"
            : "-right-2 hover:right-0"
        } hover:ease-out ease-in-out`}
        title={showTransactions ? "Hide Transactions" : "Show Transactions"}
      >
        {showTransactions ? (
          <ChevronRight className="w-4 h-4 ml-0.5" />
        ) : (
          <ChevronLeft className="w-4 h-4 mr-0.5" />
        )}
      </Button>

      {/* Left Column */}
      <div className="flex flex-col gap-6 xl:gap-8 flex-1 w-full xl:h-full xl:overflow-y-auto scrollbar-none hover:scrollbar-thin px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-r border-black/4 dark:border-white/3">
        <FinancialRecord />
        <MoneyFlowChart />
        <CategoryChart />
      </div>

      {/* Right Column*/}
      <AnimatePresence initial={false}>
        {showTransactions && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "30%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden xl:flex flex-col gap-6 xl:gap-8 shrink-0 xl:h-full xl:overflow-hidden border-l border-black/4 dark:border-white/3 backdrop-blur-sm"
          >
            <div className="w-full h-full xl:overflow-y-auto scrollbar-none hover:scrollbar-thin p-4 sm:p-6 min-w-[300px]">
              <TransactionsList />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
