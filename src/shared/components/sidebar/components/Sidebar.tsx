"use client";

import React from "react";
import {
  CreditCard,
  LayoutGrid,
  PiggyBank,
  Send,
  Activity,
  User,
  LogOut,
  Code,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccountStore } from "@/shared/store/useAccountStore";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: Activity, label: "Transactions", href: "/transactions" },
  { icon: PiggyBank, label: "Savings", href: "/savings" },
  { icon: CreditCard, label: "Cards", href: "/cards" },
  { icon: Send, label: "Payments", href: "/payments" },
  { icon: User, label: "Profile", href: "/profile" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { accounts, activeAccount, setActiveAccount } = useAccountStore();

  return (
    <aside className="w-64 bg-sidebar dark:bg-[#1a1b21] h-full flex flex-col py-8 px-6 border-r gap-8 border-black/5 dark:border-white/[0.03] transition-colors duration-500">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <Link href="/dashboard">
          <Image src="/images/logo.png" alt="Logo" width={100} height={40} className="dark:opacity-80" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`w-full flex group items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                isActive
                  ? "font-semibold text-black dark:text-zinc-200 bg-black/5 dark:bg-white/[0.03]"
                  : "text-text-muted dark:text-zinc-500 hover:text-black dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex flex-col text-left group-hover:translate-x-1 transition-all group-hover:ease-in ease-out text-[15px]">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/[0.03] flex flex-col space-y-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center justify-between gap-2 text-left px-4 py-2.5 rounded-xl text-sm text-text-muted dark:text-zinc-500 hover:text-black dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors outline-none shrink-0 border border-transparent">
              <div className="flex flex-col truncate">
                <span className="text-[15px] text-black dark:text-zinc-200 font-semibold tracking-tight">
                  {activeAccount.name}
                </span>
                <span className="text-xs opacity-70 dark:opacity-40 capitalize">
                  {activeAccount.role} Account
                </span>
              </div>
              <Code className="w-4 h-4 rotate-90 shrink-0 opacity-40" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white dark:bg-[#1f2027] rounded-xl shadow-lg border border-black/5 dark:border-white/[0.05] p-2"
            align="start"
          >
            <DropdownMenuLabel className="text-xs text-text-muted dark:text-zinc-600 px-2 py-1.5 font-normal">
              Switch Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black/5 dark:bg-white/[0.03]" />
            {accounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onClick={() => setActiveAccount(account.id)}
                className="flex items-center justify-between cursor-pointer rounded-lg px-2 py-2 outline-none hover:bg-black/5 dark:hover:bg-white/[0.03] focus:bg-black/5 dark:focus:bg-white/[0.03] transition-colors mt-1"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium dark:text-zinc-300">{account.name}</span>
                  <span className="text-xs text-text-muted dark:text-zinc-500 capitalize">
                    {account.role}
                  </span>
                </div>
                {activeAccount.id === account.id && (
                  <Check className="w-4 h-4 ml-2 text-black dark:text-zinc-200" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sign out */}
        <button className="w-full flex items-center justify-between px-4 py-2.5 mt-2 text-sm text-black dark:text-zinc-300 font-medium hover:bg-black/5 dark:hover:bg-white/[0.02] rounded-xl transition-colors">
          <span>Sign out</span>
          <LogOut className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </aside>
  );
};
