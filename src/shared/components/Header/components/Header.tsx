"use client";

import React from "react";
import { Bell, Settings } from "lucide-react";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { useMounted } from "@/shared/hooks/useMounted";

export const Header = () => {
  const { theme, toggleTheme, resolvedTheme } = useThemeStore();
  const mounted = useMounted();

  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors">Hello Steward</h1>
        <span className="text-3xl" role="img" aria-label="wave">
          👋
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors focus:outline-none"
              title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
            >
              <span
                className={`${
                  mounted && resolvedTheme === "dark" ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-200 transition-transform shadow-sm`}
              />
            </button>
          </div>

          {[Bell, Settings].map((Icon, idx) => (
            <button
              key={idx}
              className="w-11 h-11 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-black dark:text-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-white/10 relative transition-all hover:bg-gray-50 dark:hover:bg-zinc-800"
            >
              <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" strokeWidth={2.5} />
              {idx === 0 && (
                <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
