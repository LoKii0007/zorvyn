export type Role = 'admin' | 'user';

export interface Account {
  id: string;
  name: string;
  role: Role;
  email: string;
}
