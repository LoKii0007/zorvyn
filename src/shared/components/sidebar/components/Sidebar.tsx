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
  X,
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
import { useSidebarStore } from "@/shared/store/useSidebarStore";

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
  const { isOpen, close } = useSidebarStore();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden backdrop-blur-sm"
          onClick={close}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-[101] h-full w-64 shrink-0 bg-white dark:bg-[#1a1b21] flex flex-col py-8 px-5 border-r border-black/5 dark:border-white/[0.03] gap-6 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:shadow-none"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-1.5 lg:hidden text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link href="/dashboard" onClick={close}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={110}
              height={44}
              className="dark:opacity-80 h-9 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                onClick={close}
                className={`w-full flex group items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? "text-black dark:text-zinc-100 bg-black/5 dark:bg-white/[0.05]"
                    : "text-zinc-500 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.03]"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                    isActive ? "text-black dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600 group-hover:text-black dark:group-hover:text-zinc-300"
                  }`}
                  strokeWidth={2}
                />
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t border-black/5 dark:border-white/[0.03] flex flex-col gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between gap-2 text-left px-3 py-2.5 rounded-xl text-sm hover:bg-black/5 dark:hover:bg-white/[0.03] transition-colors outline-none">
                <div className="flex flex-col truncate">
                  <span className="text-[14px] text-black dark:text-zinc-200 font-semibold tracking-tight truncate">
                    {activeAccount.name}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-600 capitalize">
                    {activeAccount.role} Account
                  </span>
                </div>
                <Code className="w-4 h-4 rotate-90 shrink-0 text-zinc-400 dark:text-zinc-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white dark:bg-[#1f2027] rounded-xl shadow-lg border border-black/5 dark:border-white/[0.05] p-2"
              align="start"
            >
              <DropdownMenuLabel className="text-xs text-zinc-400 dark:text-zinc-600 px-2 py-1.5 font-normal">
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
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 capitalize">
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

          <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-zinc-500 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/[0.02] rounded-xl transition-colors">
            <span className="font-medium">Sign out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
