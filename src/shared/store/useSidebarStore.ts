import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  isMini: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  toggleMini: () => void;
  setMini: (isMini: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isMini: false,
  toggle: () =>
    set((state) => {
      const nextIsOpen = !state.isOpen;
      return {
        isOpen: nextIsOpen,
        isMini: nextIsOpen ? false : state.isMini,
      };
    }),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true, isMini: false }),
  toggleMini: () => set((state) => ({ isMini: !state.isMini })),
  setMini: (isMini) => set({ isMini }),
}));
