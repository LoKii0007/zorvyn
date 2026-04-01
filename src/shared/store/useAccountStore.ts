import { create } from 'zustand';

export type Role = 'admin' | 'user';

export interface Account {
  id: string;
  name: string;
  role: Role;
  email: string;
}

const DUMMY_ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'admin',
    email: 'admin@zorvyn.com',
  },
  {
    id: '2',
    name: 'Regular User',
    role: 'user',
    email: 'user@zorvyn.com',
  },
];

interface AccountState {
  accounts: Account[];
  activeAccount: Account;
  setActiveAccount: (accountId: string) => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  accounts: DUMMY_ACCOUNTS,
  activeAccount: DUMMY_ACCOUNTS[0],
  setActiveAccount: (accountId) =>
    set((state) => ({
      activeAccount: state.accounts.find((a) => a.id === accountId) || state.activeAccount,
    })),
}));
