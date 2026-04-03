import { create } from "zustand";
import { Transaction } from "@/shared/types/transaction";
import { DUMMY_TRANSACTIONS } from "@/shared/data/transactions";

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: DUMMY_TRANSACTIONS,
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  setTransactions: (transactions) => set({ transactions }),
}));
