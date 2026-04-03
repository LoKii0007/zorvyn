"use client";

import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionFormDialog } from "./TransactionFormDialog";

interface TransactionsToolbarProps {
  isAdmin: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  onSave: (data: any) => void;
  isFormOpen: boolean;
  onFormOpenChange: (open: boolean) => void;
}

export const TransactionsToolbar = ({
  isAdmin,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  timeFilter,
  onTimeFilterChange,
  onSave,
  isFormOpen,
  onFormOpenChange,
}: TransactionsToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-200 transition-colors shrink-0">
        Transactions
      </h1>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={timeFilter} onValueChange={onTimeFilterChange}>
          <SelectTrigger className="w-[120px] bg-white dark:bg-[#1a1b21] rounded-full h-9 border-gray-200 dark:border-white/5 text-sm font-medium focus:ring-0 dark:text-zinc-400">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent className="dark:bg-[#1f2027] border-white/5">
            <SelectItem value="all" className="dark:text-zinc-400 dark:focus:bg-white/3">
              All Time
            </SelectItem>
            <SelectItem value="daily" className="dark:text-zinc-400 dark:focus:bg-white/3">
              Daily
            </SelectItem>
            <SelectItem value="weekly" className="dark:text-zinc-400 dark:focus:bg-white/3">
              Weekly
            </SelectItem>
            <SelectItem value="monthly" className="dark:text-zinc-400 dark:focus:bg-white/3">
              Monthly
            </SelectItem>
            <SelectItem value="yearly" className="dark:text-zinc-400 dark:focus:bg-white/3">
              Yearly
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[120px] bg-white dark:bg-[#1a1b21] rounded-full h-9 border-gray-200 dark:border-white/5 text-sm font-medium focus:ring-0 dark:text-zinc-400">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="dark:bg-[#1f2027] border-white/5">
            <SelectItem value="all" className="dark:text-zinc-400 dark:focus:bg-white/3">
              All Status
            </SelectItem>
            <SelectItem value="completed" className="dark:text-zinc-400 dark:focus:bg-white/3">
              Completed
            </SelectItem>
            <SelectItem value="pending" className="dark:text-zinc-400 dark:focus:bg-white/3">
              Pending
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="relative group flex-1 min-w-[160px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-zinc-500 group-focus-within:text-black dark:group-focus-within:text-zinc-200 transition-colors" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full sm:w-[200px] rounded-full h-9 bg-white dark:bg-[#1a1b21] border-gray-200 dark:border-white/5 font-medium focus-visible:ring-0 dark:text-zinc-300 placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-all"
          />
        </div>

        {isAdmin && (
          <TransactionFormDialog
            selectedTx={null}
            onSave={onSave}
            isOpen={isFormOpen}
            onOpenChange={onFormOpenChange}
            trigger={
              <Button className="rounded-full h-9 bg-black dark:bg-zinc-200 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white transition-all px-4 shadow-sm text-sm">
                <Plus className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">New Transaction</span>
                <span className="sm:hidden">New</span>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};
