"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/shared/types/transaction";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { CATEGORIES } from "@/shared/data/categories";

const transactionSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  amount: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be greater than 0",
    ),
  type: z.enum(["income", "expense"]),
  status: z.enum(["completed", "pending"]),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormDialogProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  selectedTx: Transaction | null;
  onSave: (data: TransactionFormData) => void;
}

export const TransactionFormDialog = ({
  trigger,
  isOpen,
  onOpenChange,
  selectedTx,
  onSave,
}: TransactionFormDialogProps) => {
  const { theme } = useThemeStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      amount: "",
      type: "expense",
      status: "completed",
      category: "",
      subCategory: "",
    },
  });

  const currentType = watch("type");
  const currentStatus = watch("status");
  const currentCategory = watch("category");

  const categories = CATEGORIES[currentType as keyof typeof CATEGORIES];
  const subcategories = categories.find((c) => c.name === currentCategory)?.subcategories || [];

  useEffect(() => {
    if (selectedTx) {
      reset({
        title: selectedTx.title,
        amount: selectedTx.amount.toString(),
        type: selectedTx.type,
        status: selectedTx.status as any,
        category: selectedTx.category,
        subCategory: selectedTx.subCategory || "",
      });
    } else {
      reset({
        title: "",
        amount: "",
        type: "expense",
        status: "completed",
        category: "",
        subCategory: "",
      });
    }
  }, [selectedTx, reset, isOpen]);

  const onFormSubmit = (data: TransactionFormData) => {
    onSave(data);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`${theme} sm:max-w-[425px] rounded-2xl bg-white dark:bg-[#1a1b21] border-gray-100 dark:border-white/5 shadow-xl overflow-hidden`}
      >
        <DialogHeader className="p-6">
          <DialogTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-200">
            {selectedTx ? "Edit Transaction" : "New Transaction"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-500">
            {selectedTx
              ? "Update details for this transaction."
              : "Fill in the details to record a new transaction."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="px-6 pb-2 grid gap-5"
        >
          <div className="grid gap-2">
            <Label
              htmlFor="title"
              className="text-zinc-600 dark:text-zinc-400 font-medium"
            >
              Title
            </Label>
            <Input
              id="title"
              {...register("title")}
              className={`rounded-xl bg-gray-50 dark:bg-white/2 border-gray-100 dark:border-white/5 focus-visible:ring-0 text-zinc-900 dark:text-zinc-300 ${
                errors.title ? "border-red-500!" : ""
              }`}
              placeholder="Ex: Groceries"
            />
            {errors.title && (
              <span className="text-[10px] text-red-500 font-medium ml-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="amount"
                className="text-zinc-600 dark:text-zinc-400 font-medium"
              >
                Amount (₹)
              </Label>
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                {...register("amount")}
                className={`rounded-xl bg-gray-50 dark:bg-white/2 border-gray-100 dark:border-white/5 focus-visible:ring-0 text-zinc-900 dark:text-zinc-300 ${
                  errors.amount ? "border-red-500!" : ""
                }`}
                placeholder="0.00"
              />
              {errors.amount && (
                <span className="text-[10px] text-red-500 font-medium ml-1">
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label className="text-zinc-600 dark:text-zinc-400 font-medium">
                Type
              </Label>
              <Select
                value={currentType}
                onValueChange={(v: any) =>
                  setValue("type", v, { shouldValidate: true })
                }
              >
                <SelectTrigger className="rounded-xl bg-gray-50 dark:bg-white/2 border-gray-100 dark:border-white/5 text-zinc-900 dark:text-zinc-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#1f2027] border-black/5 dark:border-white/5">
                  <SelectItem
                    value="income"
                    className="dark:text-zinc-400 dark:focus:bg-white/5 cursor-pointer"
                  >
                    Income
                  </SelectItem>
                  <SelectItem
                    value="expense"
                    className="dark:text-zinc-400 dark:focus:bg-white/5 cursor-pointer"
                  >
                    Expense
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-zinc-600 dark:text-zinc-400 font-medium">
              Status
            </Label>
            <Select
              value={currentStatus}
              onValueChange={(v: any) =>
                setValue("status", v, { shouldValidate: true })
              }
            >
              <SelectTrigger className="rounded-xl bg-gray-50 dark:bg-white/2 border-gray-100 dark:border-white/5 text-zinc-900 dark:text-zinc-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#1f2027] border-black/5 dark:border-white/5">
                <SelectItem
                  value="completed"
                  className="dark:text-zinc-400 dark:focus:bg-white/5 cursor-pointer"
                >
                  Completed
                </SelectItem>
                <SelectItem
                  value="pending"
                  className="dark:text-zinc-400 dark:focus:bg-white/5 cursor-pointer"
                >
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-zinc-600 dark:text-zinc-400 font-medium">
                Category
              </Label>
              <Select
                value={currentCategory}
                onValueChange={(v: string) => {
                  setValue("category", v, { shouldValidate: true });
                  setValue("subCategory", ""); // Reset subcategory when category changes
                }}
              >
                <SelectTrigger className="rounded-xl bg-gray-50 dark:bg-white/2 border-gray-100 dark:border-white/5 text-zinc-900 dark:text-zinc-300">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#1f2027] border-black/5 dark:border-white/5">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.name}
                      value={cat.name}
                      className="dark:text-zinc-400 dark:focus:bg-white/5 cursor-pointer"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <span className="text-[10px] text-red-500 font-medium ml-1">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label className="text-zinc-600 dark:text-zinc-400 font-medium">
                Subcategory
              </Label>
              <Select
                value={watch("subCategory")}
                onValueChange={(v: string) =>
                  setValue("subCategory", v, { shouldValidate: true })
                }
                disabled={!currentCategory}
              >
                <SelectTrigger className="rounded-xl bg-gray-50 dark:bg-white/2 border-gray-100 dark:border-white/5 text-zinc-900 dark:text-zinc-300">
                  <SelectValue placeholder="Subcategory" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#1f2027] border-black/5 dark:border-white/5">
                  {subcategories.map((sub) => (
                    <SelectItem
                      key={sub}
                      value={sub}
                      className="dark:text-zinc-400 dark:focus:bg-white/5 cursor-pointer"
                    >
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-4 p-6 -mx-6 bg-gray-50/50 dark:bg-white/2 border-t dark:border-white/5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              className="rounded-xl hover:bg-black/5 border-gray-100 dark:border-white/10 text-zinc-600 dark:text-zinc-400 transition-colors h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-black dark:bg-zinc-200 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white px-8 transition-colors h-11 font-semibold"
            >
              {selectedTx ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
