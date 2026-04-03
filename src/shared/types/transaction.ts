export type Transaction = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  subCategory?: string;
  paymentMethod: "cash" | "card" | "upi" | "bank";
  status: "completed" | "pending";
  date: string; // ISO
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  isRecurring?: boolean;
  recurringInterval?: "daily" | "weekly" | "monthly" | "yearly";
  currency: "INR" | "USD";
  userId: string;
};
