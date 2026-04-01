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
      <div className="flex h-screen w-full max-w-[1920px] mx-auto bg-[#fcfcfd] dark:bg-[#14151a] overflow-hidden font-sans transition-colors duration-500">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          <Header />
          <div className="text-zinc-900 dark:text-zinc-300">{children}</div>
        </main>
      </div>
    </div>
  );
}
