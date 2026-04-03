"use client";

import React, { useState, useMemo } from "react";
import { useAccountStore } from "@/shared/store/useAccountStore";
import { useTransactionStore } from "@/shared/store/useTransactionStore";
import {
  parseISO,
} from "date-fns";
import { isWithinTimeFilter } from "@/shared/utils/dateUtils";
import { Pagination } from "@/shared/components/Pagination";
import { Transaction } from "@/shared/types/transaction";
import { TransactionFormDialog } from "@/features/transactions/components/TransactionFormDialog";
import { DeleteConfirmationDialog } from "@/features/transactions/components/DeleteConfirmationDialog";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { TransactionsToolbar } from "@/features/transactions/components/TransactionsToolbar";
import { TransactionsTable } from "@/features/transactions/components/TransactionsTable";
import { TransactionsMobileList } from "@/features/transactions/components/TransactionsMobileList";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";

const ITEMS_PER_PAGE = 10;

type SortConfig = {
  key: "id" | "title" | "date" | "amount" | "status" | "category" | "subCategory";
  direction: "asc" | "desc";
} | null;

export default function TransactionsPage() {
  const { activeAccount } = useAccountStore();
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
  const isAdmin = activeAccount.role === "admin";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const debouncedSearch = useDebounce(search, 300);

  // Modal Control States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key: key as any, direction: "desc" };
        return null;
      }
      return { key: key as any, direction: "asc" };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key)
      return (
        <ChevronsUpDown className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
      );
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-3 h-3 text-black dark:text-zinc-200" />
    ) : (
      <ChevronDown className="w-3 h-3 text-black dark:text-zinc-200" />
    );
  };

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (debouncedSearch) {
      filtered = filtered.filter(
        (tx) =>
          tx.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          tx.id.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((tx) => tx.status === statusFilter);
    }

    const now = new Date();
    if (timeFilter !== "all") {
      filtered = filtered.filter((tx) =>
        isWithinTimeFilter(parseISO(tx.date), timeFilter, now),
      );
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (sortConfig.key === "date") {
          valA = new Date(a.date).getTime();
          valB = new Date(b.date).getTime();
        }

        const stringA = String(valA ?? "");
        const stringB = String(valB ?? "");

        if (stringA < stringB) return sortConfig.direction === "asc" ? -1 : 1;
        if (stringA > stringB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [transactions, debouncedSearch, statusFilter, timeFilter, sortConfig]);

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
      updateTransaction(selectedTx.id, {
        ...data,
        amount: amountNum,
      });
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
      addTransaction(newTx);
    }
  };

  const confirmDelete = () => {
    if (selectedTx) {
      deleteTransaction(selectedTx.id);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <TransactionsToolbar
        isAdmin={isAdmin}
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(v) => {
          setStatusFilter(v);
          setCurrentPage(1);
        }}
        timeFilter={timeFilter}
        onTimeFilterChange={(v) => {
          setTimeFilter(v);
          setCurrentPage(1);
        }}
        onSave={handleSave}
        isFormOpen={isFormOpen && selectedTx === null}
        onFormOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setSelectedTx(null);
        }}
      />

      <TransactionsMobileList
        transactions={paginatedTransactions}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <TransactionsTable
        transactions={paginatedTransactions}
        isAdmin={isAdmin}
        sortConfig={sortConfig}
        onSort={handleSort}
        getSortIcon={getSortIcon}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <TransactionFormDialog
        isOpen={isFormOpen && selectedTx !== null}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setSelectedTx(null);
        }}
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
