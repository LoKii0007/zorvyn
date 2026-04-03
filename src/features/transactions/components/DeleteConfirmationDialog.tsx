"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/shared/types/transaction";
import { useThemeStore } from "@/shared/store/useThemeStore";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTx: Transaction | null;
  onConfirm: () => void;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  onOpenChange,
  selectedTx,
  onConfirm,
}: DeleteConfirmationDialogProps) => {
  const { theme } = useThemeStore();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={` sm:max-w-[400px] rounded-2xl bg-white !dark:bg-[#191a1e] border-gray-100 dark:border-white/5 shadow-xl overflow-hidden`}
      >
        <DialogHeader className="p-6">
          <DialogTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-200 transition-colors">
            Delete Transaction
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-500 transition-colors">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 mt-2">
          <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 shadow-sm transition-colors">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 truncate">
              {selectedTx?.title}
            </p>
            <p className="text-xs text-red-500 dark:text-red-300 mt-1 font-medium">
              ₹{selectedTx?.amount.toLocaleString()}
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 -mx-6 bg-gray-50/50 dark:bg-white/2 border-t dark:border-white/5">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl hover:bg-black/5 border-gray-100 dark:border-white/10 text-zinc-600 dark:text-zinc-400 transition-colors h-11 px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="rounded-xl px-8 bg-red-600 dark:bg-red-600/90 hover:bg-red-700 dark:hover:bg-red-600 transition-all h-11 font-semibold shadow-sm"
          >
            Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
