import { create } from 'zustand';

import { Account } from '../types/user.types';
import { DUMMY_ACCOUNTS } from '../constants/accounts';

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
