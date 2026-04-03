import { LayoutGrid, Activity, PiggyBank, CreditCard, Send, User } from "lucide-react";

export const MENU_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: Activity, label: "Transactions", href: "/transactions" },
  { icon: PiggyBank, label: "Savings", href: "/savings" },
  { icon: CreditCard, label: "Cards", href: "/cards" },
  { icon: Send, label: "Payments", href: "/payments" },
  { icon: User, label: "Profile", href: "/profile" },
];

export const APP_NAME = "Zorvyn";
export const GREETING_DEFAULT = "Hello Steward";
