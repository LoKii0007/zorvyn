import { Account } from "../types/user.types";

export const DUMMY_ACCOUNTS: Account[] = [
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
