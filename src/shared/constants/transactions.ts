import { Transaction } from "../types/transaction.types";
import { CATEGORIES } from "./categories";

// Simple seeded random function to ensure consistent results between server and client
const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// Use a fixed date reference to avoid time-based differences and ensure data exists relative to this date
export const REFERENCE_NOW = new Date("2026-04-01T00:00:00Z");

export const generateDummyTransactions = (): Transaction[] => {
  const random = seededRandom(42); // Using a fixed seed for consistency

  const transactions: Transaction[] = [];
  const paymentMethods: Transaction["paymentMethod"][] = ["cash", "card", "upi", "bank"];
  const statuses: Transaction["status"][] = ["completed", "pending"];

  // Generate data around REFERENCE_NOW (mostly past, some very recent)
  for (let i = 0; i < 1000; i++) {
    // Generate dates spread across 2 years, with some very close to REFERENCE_NOW
    const date = new Date(REFERENCE_NOW.getTime() - (random() - 0.02) * 1 / 2 * 365 * 24 * 60 * 60 * 1000);
    const type = random() > 0.3 ? "expense" as const : "income" as const;
    const amount = type === "income" ? Math.floor(random() * 50000) + 10000 : Math.floor(random() * 5000) + 100;

    const categoryGroup = CATEGORIES[type][Math.floor(random() * CATEGORIES[type].length)];
    const category = categoryGroup.name;
    const subCategory = categoryGroup.subcategories[Math.floor(random() * categoryGroup.subcategories.length)];

    transactions.push({
      id: `tx-${i}`,
      title: `${type === "income" ? "Salary from" : "Payment at"} ${category}`,
      amount,
      type,
      category,
      subCategory,
      paymentMethod: paymentMethods[Math.floor(random() * paymentMethods.length)],
      status: statuses[Math.floor(random() * statuses.length)],
      date: date.toISOString(),
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      currency: "INR",
      userId: "user-1",
    });
  }

  console.log(transactions.slice(0, 10))

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const DUMMY_TRANSACTIONS = generateDummyTransactions();
