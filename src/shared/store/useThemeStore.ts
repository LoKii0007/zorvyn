import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    updateResolvedTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: "system",
            resolvedTheme: "light",
            setTheme: (theme) => {
                set({ theme });
                get().updateResolvedTheme();
            },
            toggleTheme: () => {
                const { theme, resolvedTheme } = get();
                const next = (theme === "system" ? resolvedTheme : theme) === "light" ? "dark" : "light";
                set({ theme: next });
                get().updateResolvedTheme();
            },
            updateResolvedTheme: () => {
                if (typeof window === "undefined") return;
                const { theme } = get();
                let resolved: "light" | "dark";
                
                if (theme === "system") {
                    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    resolved = isDark ? "dark" : "light";
                } else {
                    resolved = theme as "light" | "dark";
                }
                
                set({ resolvedTheme: resolved });
                
                if (resolved === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            },
        }),
        {
            name: "theme-storage",
            onRehydrateStorage: () => (state) => {
                state?.updateResolvedTheme();
            },
        }
    )
);