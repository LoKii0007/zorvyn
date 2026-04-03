"use client";

import React from "react";
import { Bell, Settings, Menu, SunIcon, MoonIcon } from "lucide-react";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { useMounted } from "@/shared/hooks/useMounted";
import { useSidebarStore } from "@/shared/store/useSidebarStore";

import { GREETING_DEFAULT } from "@/shared/constants/navigation";

export const Header = () => {
  const { toggleTheme, resolvedTheme } = useThemeStore();
  const mounted = useMounted();
  const { toggle } = useSidebarStore();

  return (
    <header className="flex items-center justify-between w-full gap-4  ">
      {/* Left: Hamburger (mobile) + Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="lg:hidden p-2 rounded-xl text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 dark:text-zinc-400 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className=" items-center gap-2 hidden md:flex">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors leading-none">
            {GREETING_DEFAULT}
          </h1>
          <span
            className="text-xl sm:text-2xl lg:text-3xl"
            role="img"
            aria-label="wave"
          >
            👋
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <SunIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <button
            onClick={toggleTheme}
            className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-zinc-200 dark:bg-zinc-700 transition-colors focus:outline-none"
            title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
            aria-label="Toggle theme"
          >
            <span
              className={`${
                mounted && resolvedTheme === "dark"
                  ? "translate-x-6"
                  : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-200 transition-transform shadow-sm`}
            />
          </button>
          <MoonIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        </div>

        {/* Icon Buttons */}
        {[Bell, Settings].map((Icon, idx) => (
          <button
            key={idx}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-black dark:text-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] dark:shadow-none border border-gray-100 dark:border-white/10 relative transition-all hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            <Icon
              className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
              strokeWidth={2.5}
            />
            {idx === 0 && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </header>
  );
};
