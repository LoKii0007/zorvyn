import * as z from "zod";

export const transactionSchema = z.object({
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

export type SortConfig = {
  key:
    | "id"
    | "title"
    | "date"
    | "amount"
    | "status"
    | "category"
    | "subCategory";
  direction: "asc" | "desc";
} | null;

export type TransactionFormData = z.infer<typeof transactionSchema>;
