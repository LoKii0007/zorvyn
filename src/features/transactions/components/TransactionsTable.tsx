"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";
import { Transaction } from "@/shared/types/transaction.types";
import { SortConfig } from "../types/transaction.types";

interface TransactionsTableProps {
  transactions: Transaction[];
  isAdmin: boolean;
  sortConfig: SortConfig;
  onSort: (key: keyof Transaction) => void;
  getSortIcon: (key: string) => React.ReactNode;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
}


export const TransactionsTable = ({
  transactions,
  isAdmin,
  sortConfig,
  onSort,
  getSortIcon,
  onEdit,
  onDelete,
}: TransactionsTableProps) => {
  return (
    <div className="hidden md:block bg-white dark:bg-[#1a1b21] rounded-2xl border border-gray-100 dark:border-white/3 overflow-x-auto shadow-sm dark:shadow-none transition-all duration-500">
      <Table>
        <TableHeader className="bg-gray-50/50 dark:bg-white/1">
          <TableRow className="border-b border-gray-100 dark:border-white/3 hover:bg-transparent">
            <TableHead className="w-[50px] px-6">
              <Checkbox className="rounded-[4px] bg-white dark:bg-zinc-800 border-gray-300 dark:border-white/1 w-5 h-5 flex items-center justify-center data-[state=checked]:bg-black dark:data-[state=checked]:bg-zinc-200 data-[state=checked]:border-black dark:data-[state=checked]:border-zinc-200 shadow-none!" />
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
              <button
                onClick={() => onSort("id")}
                className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors"
              >
                ID {getSortIcon("id")}
              </button>
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
              <button
                onClick={() => onSort("title")}
                className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors"
              >
                Title {getSortIcon("title")}
              </button>
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
              <button
                onClick={() => onSort("date")}
                className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors"
              >
                Date {getSortIcon("date")}
              </button>
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
              <button
                onClick={() => onSort("amount")}
                className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors"
              >
                Amount {getSortIcon("amount")}
              </button>
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
              <button
                onClick={() => onSort("category")}
                className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors"
              >
                Category {getSortIcon("category")}
              </button>
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
              <button
                onClick={() => onSort("status")}
                className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors"
              >
                Status {getSortIcon("status")}
              </button>
            </TableHead>
            {isAdmin && (
              <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px] px-6 text-right">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              className="border-b border-gray-50 dark:border-white/2 hover:bg-gray-50/50 dark:hover:bg-white/1 transition-colors"
            >
              <TableCell className="px-6 py-4">
                <Checkbox className="rounded-[4px] bg-white dark:bg-zinc-800 border-gray-300 dark:border-white/1 w-5 h-5 flex items-center justify-center data-[state=checked]:bg-black dark:data-[state=checked]:bg-zinc-200 data-[state=checked]:border-black dark:data-[state=checked]:border-zinc-200 shadow-none!" />
              </TableCell>
              <TableCell className="py-4 font-medium text-gray-900 dark:text-zinc-300 border-none text-[14px]">
                {tx.id.toUpperCase()}
              </TableCell>
              <TableCell className="py-4 border-none text-zinc-900 dark:text-zinc-300 max-w-[200px] truncate">
                <div className="flex flex-col">
                  <span className="font-medium text-[14px]">{tx.title}</span>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                    {tx.subCategory}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 font-medium text-gray-600 dark:text-zinc-500 border-none text-[14px]">
                {format(parseISO(tx.date), "dd MMM yyyy")}
              </TableCell>
              <TableCell
                className={`py-4 font-semibold border-none text-[14px] ${
                  tx.type === "income"
                    ? "text-green-600 dark:text-emerald-500/70"
                    : "text-red-500 dark:text-red-500/70"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}₹
                {tx.amount.toLocaleString()}
              </TableCell>
              <TableCell className="py-4 font-medium text-gray-600 dark:text-zinc-500 border-none text-[14px]">
                {tx.category}
              </TableCell>
              <TableCell className="py-4 border-none">
                <Badge
                  variant="secondary"
                  className={`px-3.5 py-1.5 font-medium text-[12px] rounded-full border-transparent shadow-none capitalize transition-colors ${
                    tx.status === "pending"
                      ? "bg-[#FFF4D6] dark:bg-orange-950/20 text-[#D49100] dark:text-orange-500/70"
                      : tx.status === "completed"
                      ? "bg-[#DCFCE7] dark:bg-emerald-950/20 text-[#16A34A] dark:text-emerald-500/70"
                      : "bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {tx.status}
                </Badge>
              </TableCell>
              {isAdmin && (
                <TableCell className="px-6 py-4 text-right border-none">
                  <div className="flex items-center justify-end gap-2 text-gray-400 dark:text-zinc-600">
                    <button
                      onClick={() => onEdit(tx)}
                      className="hover:text-black dark:hover:text-zinc-300 transition-colors outline-none p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(tx)}
                      className="hover:text-red-500 dark:hover:text-red-400 transition-colors outline-none p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
