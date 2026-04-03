import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  isMini: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  toggleMini: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isMini: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
  toggleMini: () => set((state) => ({ isMini: !state.isMini })),
}));
