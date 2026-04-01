"use client";

import React from "react";
import { Sidebar } from "@/shared/components/sidebar/components/Sidebar";
import { Header } from "@/shared/components/Header/components/Header";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { useMounted } from "@/shared/hooks/useMounted";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme } = useThemeStore();
  const mounted = useMounted();

  return (
    <div className={`${mounted ? resolvedTheme : "light"} w-full`}>
      <div className="flex h-screen w-full max-w-[1920px] mx-auto bg-[#f7f8fa] dark:bg-[#14151a] overflow-hidden font-sans transition-colors duration-500">
        <Sidebar />
        <main className="flex-1 overflow-y-auto flex flex-col min-w-0">
          <div className="sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 bg-[#f7f8fa]/80 dark:bg-[#14151a]/80 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.03]">
            <Header />
          </div>
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-zinc-900 dark:text-zinc-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
