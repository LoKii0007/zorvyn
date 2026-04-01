"use client";

import React, { useState, useMemo } from "react";
import { useAccountStore } from "@/shared/store/useAccountStore";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { DUMMY_TRANSACTIONS as INITIAL_DATA } from "@/shared/data/transactions";
import { format, isSameDay, isSameWeek, isSameMonth, isSameYear, parseISO } from "date-fns";
import { Pagination } from "@/shared/components/Pagination";
import { Transaction } from "@/shared/types/transaction";
import { TransactionFormDialog } from "@/features/transactions/components/TransactionFormDialog";
import { DeleteConfirmationDialog } from "@/features/transactions/components/DeleteConfirmationDialog";

const ITEMS_PER_PAGE = 10;

type SortConfig = {
  key: "id" | "title" | "date" | "amount" | "status";
  direction: "asc" | "desc";
} | null;

export default function TransactionsPage() {
  const { activeAccount } = useAccountStore();
  const isAdmin = activeAccount.role === "admin";

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // Modal Control States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleSort = (key: "id" | "title" | "date" | "amount" | "status") => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ChevronsUpDown className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3 text-black dark:text-zinc-200" /> : <ChevronDown className="w-3 h-3 text-black dark:text-zinc-200" />;
  };

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (search) {
      filtered = filtered.filter(tx => 
        tx.title.toLowerCase().includes(search.toLowerCase()) || 
        tx.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }

    const now = new Date();
    if (timeFilter !== "all") {
      filtered = filtered.filter(tx => {
        const txDate = parseISO(tx.date);
        switch (timeFilter) {
          case "daily": return isSameDay(txDate, now);
          case "weekly": return isSameWeek(txDate, now);
          case "monthly": return isSameMonth(txDate, now);
          case "yearly": return isSameYear(txDate, now);
          default: return true;
        }
      });
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (sortConfig.key === "date") {
          valA = new Date(a.date).getTime();
          valB = new Date(b.date).getTime();
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [transactions, search, statusFilter, timeFilter, sortConfig]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const handleEdit = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsDeleteOpen(true);
  };

  const handleSave = (data: any) => {
    const amountNum = parseFloat(data.amount);
    
    if (selectedTx) {
      setTransactions(prev => prev.map(t => 
        t.id === selectedTx.id ? { 
          ...t, 
          ...data, 
          amount: amountNum, 
          updatedAt: new Date().toISOString() 
        } : t
      ));
    } else {
      const newTx: Transaction = {
        id: `tx-${Math.random().toString(36).substr(2, 9)}`,
        ...data,
        amount: amountNum,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currency: "INR",
        userId: "user-1",
        paymentMethod: "bank",
      };
      setTransactions(prev => [newTx, ...prev]);
    }
  };

  const confirmDelete = () => {
    if (selectedTx) {
      setTransactions(prev => prev.filter(t => t.id !== selectedTx.id));
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="flex items-center justify-between transition-all duration-500">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-200 transition-colors">Transactions</h1>

        <div className="flex items-center gap-3">
          <Select defaultValue="all" onValueChange={(v) => { setTimeFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-[140px] bg-white dark:bg-[#1a1b21] rounded-full h-10 border-gray-200 dark:border-white/[0.05] text-sm font-medium focus:ring-0 dark:text-zinc-400">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#1f2027] border-white/5">
              <SelectItem value="all" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">All Time</SelectItem>
              <SelectItem value="daily" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Daily</SelectItem>
              <SelectItem value="weekly" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Weekly</SelectItem>
              <SelectItem value="monthly" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Monthly</SelectItem>
              <SelectItem value="yearly" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-[140px] bg-white dark:bg-[#1a1b21] rounded-full h-10 border-gray-200 dark:border-white/[0.05] text-sm font-medium focus:ring-0 dark:text-zinc-400">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#1f2027] border-white/5">
              <SelectItem value="all" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">All Status</SelectItem>
              <SelectItem value="completed" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Completed</SelectItem>
              <SelectItem value="pending" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Pending</SelectItem>
              <SelectItem value="failed" className="dark:text-zinc-400 dark:focus:bg-white/[0.03]">Failed</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-zinc-500 group-focus-within:text-black dark:group-focus-within:text-zinc-200 transition-colors" />
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-9 pr-12 w-[240px] rounded-full h-10 bg-white dark:bg-[#1a1b21] border-gray-200 dark:border-white/[0.05] font-medium focus-visible:ring-0 dark:text-zinc-300 placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-all"
            />
          </div>

          {isAdmin && (
            <TransactionFormDialog 
              selectedTx={null} 
              onSave={handleSave}
              isOpen={isFormOpen && selectedTx === null}
              onOpenChange={(open) => { setIsFormOpen(open); if(!open) setSelectedTx(null); }}
              trigger={
                <Button className="rounded-full h-10 bg-black dark:bg-zinc-200 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white transition-all px-4 ml-2 shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Transaction
                </Button>
              }
            />
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1b21] rounded-2xl border border-gray-100 dark:border-white/[0.03] overflow-hidden shadow-sm dark:shadow-none transition-all duration-500">
        <Table>
          <TableHeader className="bg-gray-50/50 dark:bg-white/[0.01]">
            <TableRow className="border-b border-gray-100 dark:border-white/[0.03] hover:bg-transparent">
              <TableHead className="w-[50px] px-6">
                <Checkbox className="rounded-[4px] bg-white dark:bg-zinc-800 border-gray-300 dark:border-white/[0.1] w-5 h-5 flex items-center justify-center data-[state=checked]:bg-black dark:data-[state=checked]:bg-zinc-200 data-[state=checked]:border-black dark:data-[state=checked]:border-zinc-200 shadow-none!" />
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
                <button onClick={() => handleSort("id")} className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors">
                  ID
                  {getSortIcon("id")}
                </button>
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
                <button onClick={() => handleSort("title")} className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors">
                  Title
                  {getSortIcon("title")}
                </button>
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
                <button onClick={() => handleSort("date")} className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors">
                  Date
                  {getSortIcon("date")}
                </button>
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
                <button onClick={() => handleSort("amount")} className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors">
                  Amount
                  {getSortIcon("amount")}
                </button>
              </TableHead>
              <TableHead className="py-4 font-medium text-gray-500 dark:text-zinc-500 text-[13px]">
                <button onClick={() => handleSort("status")} className="flex items-center gap-1 group cursor-pointer hover:text-gray-800 dark:hover:text-zinc-300 transition-colors">
                  Status
                  {getSortIcon("status")}
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
            {paginatedTransactions.map((tx) => (
              <TableRow
                key={tx.id}
                className="border-b border-gray-50 dark:border-white/[0.02] hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors"
              >
                <TableCell className="px-6 py-4">
                  <Checkbox className="rounded-[4px] bg-white dark:bg-zinc-800 border-gray-300 dark:border-white/[0.1] w-5 h-5 flex items-center justify-center data-[state=checked]:bg-black dark:data-[state=checked]:bg-zinc-200 data-[state=checked]:border-black dark:data-[state=checked]:border-zinc-200 shadow-none!" />
                </TableCell>
                <TableCell className="py-4 font-medium text-gray-900 dark:text-zinc-300 border-none text-[15px]">
                  {tx.id.toUpperCase()}
                </TableCell>
                <TableCell className="py-4 border-none text-zinc-900 dark:text-zinc-300 w-64 truncate">
                  <span className="font-medium text-[15px]">{tx.title}</span>
                </TableCell>
                <TableCell className="py-4 font-medium text-gray-600 dark:text-zinc-500 border-none text-[15px]">
                  {format(parseISO(tx.date), "dd MMM yyyy")}
                </TableCell>
                <TableCell className={`py-4 font-semibold border-none text-[15px] ${tx.type === "income" ? "text-green-600 dark:text-emerald-500/70" : "text-red-500 dark:text-red-500/70"}`}>
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                </TableCell>
                <TableCell className="py-4 border-none">
                  <Badge
                    variant="secondary"
                    className={`px-3.5 py-1.5 font-medium text-[13px] rounded-full border-transparent shadow-none capitalize transition-colors ${
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
                    <div className="flex items-center justify-end gap-3 text-gray-400 dark:text-zinc-600">
                      <button
                        onClick={() => handleEdit(tx)}
                        className="hover:text-black dark:hover:text-zinc-300 transition-colors outline-none p-1"
                        title="Edit"
                      >
                        <Pencil className="w-[18px] h-[18px]" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(tx)}
                        className="hover:text-red-500 dark:hover:text-red-400 transition-colors outline-none p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <TransactionFormDialog 
        isOpen={isFormOpen && selectedTx !== null} 
        onOpenChange={(open) => { setIsFormOpen(open); if(!open) setSelectedTx(null); }} 
        selectedTx={selectedTx} 
        onSave={handleSave} 
      />

      <DeleteConfirmationDialog 
        isOpen={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        selectedTx={selectedTx} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
}
