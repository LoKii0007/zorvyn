"use client";

import React from "react";
import {
  LogOut,
  Code,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MENU_ITEMS } from "@/shared/constants/navigation";
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
import { useDebounce } from "@/shared/hooks/useDebounce";



export const Sidebar = () => {
  const pathname = usePathname();
  const { accounts, activeAccount, setActiveAccount } = useAccountStore();
  const { isOpen, close, isMini, toggleMini } = useSidebarStore();
  const debouncedIsMini = useDebounce(isMini, 200);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] lg:hidden backdrop-blur-sm"
          onClick={close}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-[71] h-full shrink-0 bg-white dark:bg-[#1a1b21] flex flex-col py-8 border-r border-black/5 dark:border-white/3 gap-6 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isMini ? "w-20 px-3" : "w-64 px-5"
        } ${
          isOpen
            ? "translate-x-0 shadow-2xl pointer-events-auto"
            : "-translate-x-full lg:shadow-none pointer-events-none lg:pointer-events-auto"
        }`}
      >
        {/* Toggle Mini Button (Desktop Only) */}
        <button
          onClick={toggleMini}
          className="hidden lg:flex absolute top-6 -right-3.5 z-72 w-7 h-7 items-center justify-center bg-white dark:bg-[#1a1b21] border border-black/5 dark:border-white/10 rounded-full shadow-md text-zinc-400 hover:text-black dark:hover:text-zinc-200 transition-all hover:scale-110 cursor-pointer group/toggle"
          aria-label={isMini ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isMini ? (
            <ChevronRight className="w-4 h-4 group-hover/toggle:translate-x-0.5 transition-transform" />
          ) : (
            <ChevronLeft className="w-4 h-4 group-hover/toggle:-translate-x-0.5 transition-transform" />
          )}
        </button>
        {/* Mobile Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-1.5 lg:hidden text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center transition-all duration-300">
          <Link href="/dashboard" onClick={close}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={isMini ? 32 : 110}
              height={isMini ? 32 : 44}
              className={`dark:opacity-80 transition-all duration-300 object-contain ${isMini ? "h-8 w-8" : "h-9 w-auto"}`}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto shrink-0">
          {MENU_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                onClick={close}
                className={`w-full flex group items-center transition-all duration-300 justify-start ${
                  isMini 
                    ? "px-[19px] gap-0 py-3" 
                    : "px-3 gap-3 py-2.5"
                } rounded-xl text-[14px] font-medium ${
                  isActive
                    ? "text-black dark:text-zinc-100 bg-black/5 dark:bg-white/5"
                    : "text-zinc-500 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-200 hover:bg-black/4 dark:hover:bg-white/3"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                    isActive
                      ? "text-black dark:text-zinc-100"
                      : "text-zinc-400 dark:text-zinc-600 group-hover:text-black dark:group-hover:text-zinc-300"
                  } shrink-0 `}
                  strokeWidth={2}
                />
                {!debouncedIsMini && (
                  <span
                    className={`group-hover:translate-x-0.5 transition-transform duration-200 whitespace-nowrap ${isMini ? "opacity-0" : "opacity-100"}`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t border-black/5 dark:border-white/3 flex flex-col gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={`w-full flex items-center transition-all duration-300 outline-none cursor-pointer justify-start ${
                  isMini ? "px-[13px]" : "px-3"
                } py-2.5 rounded-xl text-sm hover:bg-black/5 dark:hover:bg-white/3`}
              >
                {!isMini ? (
                  <>
                    <div className="flex flex-col truncate flex-1 text-left">
                      <span className="text-[14px] text-black dark:text-zinc-200 font-semibold tracking-tight truncate">
                        {activeAccount.name}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-600 capitalize">
                        {activeAccount.role} Account
                      </span>
                    </div>
                    <Code className="w-4 h-4 rotate-90 shrink-0 text-zinc-400 dark:text-zinc-600 ml-2" />
                  </>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {activeAccount.name[0]}
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white dark:bg-[#1f2027] rounded-xl shadow-lg border border-black/5 dark:border-white/5 p-2 z-100"
              align={isMini ? "center" : "start"}
              side={isMini ? "right" : "bottom"}
              sideOffset={isMini ? 12 : 8}
            >
              <DropdownMenuLabel className="text-xs text-zinc-400 dark:text-zinc-600 px-2 py-1.5 font-normal">
                Switch Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black/5 dark:bg-white/3" />
              {accounts.map((account) => (
                <DropdownMenuItem
                  key={account.id}
                  onSelect={() => setActiveAccount(account.id)}
                  className="flex items-center justify-between cursor-pointer rounded-lg px-2 py-2 outline-none hover:bg-black/5 dark:hover:bg-white/3 focus:bg-black/5 dark:focus:bg-white/3 transition-colors mt-1"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium dark:text-zinc-300">
                      {account.name}
                    </span>
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

          <button
            type="button"
            className={`w-full flex items-center transition-all duration-300 cursor-pointer justify-start ${
              isMini ? "px-[19px]" : "px-3 justify-between"
            } py-2.5 text-sm text-zinc-500 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/2 rounded-xl`}
          >
            {!isMini && <span className="font-medium flex-1 text-left">Sign out</span>}
            <LogOut className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
};
