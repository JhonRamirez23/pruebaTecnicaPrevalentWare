declare module "react-csv";

export interface Context {
  user?: { id: number; role: 'ADMIN' | 'USER' };
}

export interface AddTransactionArgs {
  concept: string;
  amount: number;
  date: string;
}

export interface UpdateUserArgs {
  id: number;
  name: string;
  role: 'ADMIN' | 'USER';
}

export interface CreateUserArgs {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}
